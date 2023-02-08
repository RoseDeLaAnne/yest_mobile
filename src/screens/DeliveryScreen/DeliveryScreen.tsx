import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getBottomSpace } from "react-native-iphone-x-helper";

import StatusBar from "../../components/StatusBar";
import ButtonBack from "../../components/ButtonBack";
import InputWithLabel from "../../components/InputWithLabel";
import ButtonRed from "../../components/ButtonRed";
import { AsyncStorage } from "react-native";
import { GRAY, LIGHT_GRAY, LIGHT_GRAY_2, WHITE } from "../../assets/colors";
import { fonts } from "../../constants/styles";
import { WINDOW_HEIGHT, WINDOW_WIDTH, wrappers } from "../../utils/style";
import {
  BOOKTABLE,
  DELIVERY,
  ORDERPROCESSED,
  RESTAURANT,
  SMS,
} from "../../utils/navigation";
import { inject, observer } from "mobx-react";
import { showAlertError } from "../../utils/utils";
import DatePicker from "react-native-date-picker";
import MaskInput from "react-native-mask-input";

import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";

import axios from "axios"

let debounce = null;

const DeliveryScreen: React.FC<{
  route: any;
}> = inject(
  "authStore",
  "dataStore"
)(
  observer(({ navigation, authStore, dataStore, route }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [newUser, setNewUser] = useState(true);
    const [validUser, setValidUser] = useState(false);
    const [streets, setStreets] = useState([]);
    const [streetLoading, setStreetLoading] = useState(false);
    const [onPlace, setOnPlace] = useState("");
    const [street, setStreet] = useState(null);
    const [streetData, setStreetData] = useState(null);
    const [houseNumber, setHouseNumber] = useState(null);
    const [entrance, setEntrance] = useState(null);
    const [floor, setFloor] = useState(null);
    const [flat, setFlat] = useState(null);
    const [appartment, setAppartment] = useState(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(null);
    const [deliveryDate, setDeliveryDate] = useState(0);
    const [comment, setComment] = useState(null);
    const [bag] = useState(route.params.bag);
    const [order, setOrder] = useState(null);
    const [period, setPeriod] = useState(null);
    const [periods, setPeriods] = useState([]);
    const [open, setOpen] = useState(false);
    const [openBirthday, setOpenBirthday] = useState(false);
    const [dateLoading, setDateLoading] = useState(false);
    const [streetPickerOpen, setStreetPickerOpen] = useState(false);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [deliverable, setDeliverable] = useState(false);
    const [deliverableMessage, setDeliverableMessage] = useState(null);
    const [loader, setLoader] = useState(false);
    const {
      type,
      shop,
      orderDone,
      orderAudit,
      getStreetName,
      transferAddress,
      periodTime,
      orderDateTime,
      userCheck,
      removeCart,
      getCountP,
      setCountP,
      getLol,
      setOrderId,
      sbpPay,
    } = dataStore;
    const { auth, changeKostilFalse, kostil } = authStore;

    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        console.log("rout",kostil);
        if (kostil) {
          // console.log("route.params?.next", route.params?.next);
          afterSms();

        }
      });

      return unsubscribe;
    }, [navigation]);

    const fetchStreets = () => {
      if (street?.length > 3) {
        debounce = null;
        setStreets([]);
        debounce = setTimeout(() => {
          setStreetLoading(true);
          setLoader(true);
          getStreetName(street)
            .then((response) => {
              if (response.data.data.length) {
                let list = response.data.data;
                list = list.map((d) => ({ ...d, id: d._id }));
                setStreets(list);
              } else {
                // setStreetData(null);
              }
            })
            .catch((e) => {
              console.log("getStreetName error");
            })
            .finally(() => {
              setLoader(false);
              setStreetLoading(false);
            });
        }, 500);
      }
    };
    const getUserPhone = async () => {
      let phone = await AsyncStorage.getItem("phone");
      let name = await AsyncStorage.getItem("name");
      if (phone) {
        setPhoneNumber(phone);
      }
      if (name) {
        setName(name);
      }
    };
    useEffect(() => {
      getUserPhone();
    }, []);

    const checkUser = async () => {
      if (name?.length > 2 && phoneNumber?.length > 3 && birthday != null) {
        birthday.setSeconds(0);
        birthday.setMilliseconds(0);

        let dateResult = Math.floor(birthday.valueOf() / 1000);
        console.log("=======", dateResult);
        setLoader(true);

        // const body = {
        //   sessionId: 'fd61fb4b-a708-11ed-850b-0050569df549',
        //   phone: '9520288582'
        // }

        // const response = await axios.post('https://marketa.su/api/user-check', body)

        // console.log(response.data.data)

        // if (response.data.success) {
        //   setValidUser(true);

        //   setLoader(false);

        //   console.log('its valid')
        // }

        userCheck(phoneNumber, name, dateResult)
          .then((response) => {
            if (response.data.success) {
              console.log("userCheck---==", response.data);
              setValidUser(true);
            } else {
              showAlertError("Введите действительные данные пользователя");
            }
          })
          .catch((err) => {
            console.error(err);
            console.log("userCheck---==", err);
          })
          .finally(() => {
            setLoader(false);
          });
      } else {
        let errors = [];
        if (!(name?.length > 2)) {
          errors.push("Пожалуйста, допустимое имя");
        }
        if (!(phoneNumber?.length > 3)) {
          errors.push("Пожалуйста, действительный номер телефона");
        }
        if (!birthday) {
          errors.push("Пожалуйста, выберите действительный день рождения");
        }
        console.log("errors", errors);
        showAlertError(errors.join(", "));
      }
    };

    const isDeliverable = () => {
      console.log("streetData && houseNumber", streetData, houseNumber);
      clearTimeout(debounce);
      debounce = null;
      debounce = setTimeout(() => {
        setLoader(true);
        transferAddress(streetData, houseNumber, type != DELIVERY ? 1 : 0)
          .then((response) => {
            console.log("transferAddress response", response.data);
            setDeliverable(response.data.success);
            if (response.data.success) {
              setOrder(response.data.data[0]);
              if (type != DELIVERY) {
                periodTime(nowDate(), response.data.data[0]?.organizationId)
                  .then((periodResponse) => {
                    if (
                      periodResponse.data.success &&
                      periodResponse.data.data.length
                    ) {
                      console.log(
                        "itsworks",
                        periodResponse.data.data[0]?.periodId
                      );
                      setOnPlace(periodResponse.data.data[0]?.periodId);
                    } else {
                      showAlertError(periodResponse.data.error);
                      console.log("first failed");
                    }
                  })
                  .catch((e) => {
                    console.log("periodResponse failed");
                  });
              }
            } else {
              showAlertError(response.message);
            }
          })
          .catch((e) => {
            console.log("transferAddress failed", e);
          })
          .finally(() => {
            console.log("loader 5");

            setLoader(false);
          });
      }, 1000);
    };

    const deliveryOption = () => {
      date.setSeconds(0);
      date.setMilliseconds(0);
      setDateLoading(true);
      let dateResult = Math.floor(date.valueOf() / 1000);
      setDeliveryDate(dateResult);
      setLoader(true);
      periodTime(dateResult, order?.organizationId)
        .then((periodResponse) => {
          console.log("periodResponse", periodResponse.data);
          if (periodResponse.data.success && periodResponse.data.data.length) {
            setPeriods(periodResponse.data.data);
          } else {
            showAlertError(periodResponse.data.error);
          }
        })
        .catch((e) => {
          console.log("periodResponse failed");
        })
        .finally(() => {
          console.log("loader 2");

          setLoader(false);
          setDateLoading(false);
        });
    };
    const nowDate = () => {
      let date = new Date();
      date.setSeconds(0);
      date.setMilliseconds(0);
      let dateResult = Math.floor(date.valueOf() / 1000);
      return dateResult;
    };

    const placeOrderDateTime = () => {
      setLoader(true);

      orderDateTime(
        type === DELIVERY ? deliveryDate : nowDate(),
        type === DELIVERY ? period : onPlace
      )
        .then((response) => {
          console.log("placeOrderDateTime success", response.data);
          if (response.data.success) {
            placeOrder();
          } else {
            console.log("placeOrderDateTime error", response.data.error);
            showAlertError(response.data.error);
          }
        })

        .catch((e) => {
          console.log("failed placeOrderDateTime", e);
          setLoader(false);
        })
        .finally(() => {
          console.log("loader 1");
        });
    };

    const afterSms = () => {
      changeKostilFalse();

      let arr = shop.branches.map((b) => b.id);
      arr.unshift(shop.uuid);

      let payload = {
        organizations: arr,
        paymentType: 1,
        quantityOfPeople: getCountP() > 0 ? getCountP() + 1 : 0,
        soonAsPossible: 1,
        entrance,
        floor,
        appartment,
        comment,
      };
      orderDone(payload)
        .then((response) => {
          console.log("-=-=-==- success", response.data);
          setOrderId(response.data.data[0].orderId),
            sbpPay(
              response.data.data[0].orderId,
              getLol(),
              response.data.data[0].orderNumber,
              response.data.data[0].payableSum
            ).then((respo) => {
              console.log("1111111", respo.data);

              if (respo.data.success) {
                Linking.openURL(respo.data.url);
                setCountP(0);
                removeCart();
                navigation.popToTop();
                navigation.navigate(ORDERPROCESSED, {
                  from: DELIVERY,
                });
                setLoader(false);
                console.log("lolkekeahah error");
              }
            });

          setCountP(0);
          removeCart();
          navigation.popToTop();
          navigation.navigate(ORDERPROCESSED, { from: DELIVERY });
        })
        .catch((error) => {
          console.log("placeorder error");
        })
        .finally(() => {});
    };

    const placeOrder = () => {
      let arr = shop.branches.map((b) => b.id);
      arr.unshift(shop.uuid);

      let payload = {
        organizations: arr,
        paymentType: 1,
        quantityOfPeople: getCountP() > 0 ? getCountP() + 1 : 0,
        soonAsPossible: 1,
        entrance,
        floor,
        appartment,
        comment,
      };
      setLoader(true);
      orderAudit(payload)
        .then((res) => {
          console.log("-=-=-==- orderAudit success", res.data.success);
          if (res.data.success) {
            auth(
              () =>
                navigation.navigate(SMS, {
                  from: DELIVERY,
                  phone: phoneNumber,
                }),
              phoneNumber
            );
          } else {
            showAlertError(res.data.data[0].message);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.log("-=-=-==- orderAudit failed", error);
        });
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ paddingHorizontal: 16, backgroundColor: LIGHT_GRAY, flex: 1 }}
      >
        <StatusBar />
        <ButtonBack onPress={() => navigation.goBack()} />
        <KeyboardAwareScrollView
          style={styles.wrapper}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[fonts.font28bold, { marginTop: 24 }]}>
            {type === DELIVERY ? "Доcтавка" : "Заказать на месте"}
          </Text>

          <View>
            <Text style={[styles.fontLabel, { color: "#000" }]}>
              Номер телефона
            </Text>
            <MaskInput
              style={{
                width: "100%",
                height: 48,
                backgroundColor: LIGHT_GRAY_2,
                borderRadius: 10,
                paddingHorizontal: 17,
                ...wrappers.rowCenteredWrapper,
                //alignItems: 'flex-start',
                justifyContent: "flex-start",
              }}
              value={phoneNumber}
              keyboardType={"numeric"}
              placeholder=""
              onChangeText={(masked, unmasked, obfuscated) => {
                const text = unmasked.startsWith("7")
                  ? unmasked.substring(1)
                  : unmasked;
                setPhoneNumber(text); // you can use the unmasked value as well
                console.log("obfuscated", obfuscated);

                // assuming you typed "9" all the way:
                console.log("masked", masked); // (99) 99999-9999
                console.log("unmasked", unmasked.substring(1)); // 99999999999
              }}
              mask={[
                "7",
                "(",
                /\d/,
                /\d/,
                /\d/,
                ")",
                "-",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
              ]}
            />
          </View>

          {/* {newUser ? ( */}
          {newUser ? (
            <>
              <InputWithLabel
                fontLabelStyle={{ color: "#000" }}
                label={"Имя"}
                value={name}
                onChange={setName}
                style={{ marginTop: 24 }}
              />
              {type === DELIVERY ? (
                <View style={{ marginTop: 24 }}>
                  <Text style={[styles.fontLabel, { color: "#000" }]}>
                    День рождения
                  </Text>
                  <TouchableOpacity
                    onPress={() => setOpenBirthday(true)}
                    style={{
                      width: "100%",
                      height: 48,
                      backgroundColor: LIGHT_GRAY_2,
                      borderRadius: 10,
                      paddingHorizontal: 17,
                      ...wrappers.rowCenteredWrapper,
                      //alignItems: 'flex-start',
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text>
                      {birthday ? moment(birthday).format("YYYY-MM-DD") : null}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {type === DELIVERY ? (
                <DatePicker
                  modal
                  open={openBirthday}
                  date={birthday}
                  mode="date"
                  maximumDate={new Date()}
                  onConfirm={(value) => {
                    setOpenBirthday(false);
                    setBirthday(value);
                  }}
                  onCancel={() => {
                    setOpenBirthday(false);
                  }}
                />
              ) : null}
            </>
          ) : null}
          {validUser ? (
            <View>
              {type === DELIVERY ? (
                <>
                  <DropDownPicker
                    schema={{
                      label: "name",
                      value: "uuid",
                    }}
                    style={{
                      width: "100%",
                      height: 48,
                      backgroundColor: LIGHT_GRAY_2,
                      borderRadius: 10,
                      borderWidth: 0,
                      marginTop: 24,
                      paddingHorizontal: 17,
                      ...wrappers.rowCenteredWrapper,
                      //alignItems: 'flex-start',
                      justifyContent: "flex-start",
                    }}
                    zIndex={1000}
                    maxHeight={400}
                    flatListProps={{
                      initialNumToRender: 10,
                    }}
                    value={streetData}
                    items={streets}
                    loading={streetLoading}
                    searchable={true}
                    disableLocalSearch={true} // required for remote search
                    onChangeSearchText={(text) => {
                      setStreet(text);
                      fetchStreets();
                    }}
                    placeholder="Введите адрес"
                    setValue={setStreetData}
                    open={streetPickerOpen}
                    setOpen={setStreetPickerOpen}
                    onSelectItem={(value) => {
                      setStreetData(value);
                    }}
                    ListEmptyComponent={({
                      listMessageContainerStyle,
                      listMessageTextStyle,
                      ActivityIndicatorComponent,
                      loading,
                      message,
                    }) => (
                      <View style={listMessageContainerStyle}>
                        {loading ? (
                          <ActivityIndicatorComponent />
                        ) : (
                          <Text style={listMessageTextStyle}>
                            Type to search
                          </Text>
                        )}
                      </View>
                    )}
                  />

                  <View
                    style={[wrappers.rowStretchedWrapper, { marginTop: 16 }]}
                  >
                    {/* Entrance */}
                    <InputWithLabel
                      label={"Номер дома"}
                      value={houseNumber}
                      onChange={setHouseNumber}
                      style={{ width: (WINDOW_WIDTH - 32 - 8) / 2 }}
                      keyboardType={"numeric"}
                    />
                    <InputWithLabel
                      label={"Подъезд"}
                      value={entrance}
                      onChange={setEntrance}
                      style={{ width: (WINDOW_WIDTH - 32 - 8) / 2 }}
                      keyboardType={"numeric"}
                    />
                  </View>
                  <View
                    style={[wrappers.rowStretchedWrapper, { marginTop: 16 }]}
                  >
                    {/* Flat */}
                    <InputWithLabel
                      label={"Квартира"}
                      value={flat}
                      onChange={setFlat}
                      style={{ width: (WINDOW_WIDTH - 32 - 8) / 2 }}
                      keyboardType={"numeric"}
                    />
                    {/* Floor */}
                    <InputWithLabel
                      label={"Этаж"}
                      value={floor}
                      onChange={setFloor}
                      style={{ width: (WINDOW_WIDTH - 32 - 8) / 2 }}
                      keyboardType={"numeric"}
                    />
                  </View>
                </>
              ) : null}

              {type === DELIVERY ? (
                <InputWithLabel
                  label={"Комментарий"}
                  style={{ marginTop: 24 }}
                  value={comment}
                  onChange={setComment}
                />
              ) : null}

              {order && type === DELIVERY ? (
                <View style={[wrappers.rowStretchedWrapper, { marginTop: 16 }]}>
                  {/* Date */}

                  <View style={{ width: (WINDOW_WIDTH - 32 - 8) / 2 }}>
                    <Text style={[styles.fontLabel]}>Дата</Text>
                    <TouchableOpacity
                      onPress={() => setOpen(true)}
                      style={{
                        width: "100%",
                        height: 48,
                        backgroundColor: LIGHT_GRAY_2,
                        borderRadius: 10,
                        paddingHorizontal: 17,
                        ...wrappers.rowCenteredWrapper,
                        //alignItems: 'flex-start',
                        justifyContent: "flex-start",
                      }}
                    >
                      <Text>{moment(date).format("YYYY-MM-DD")}</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Time */}
                  <ScrollView style={{ width: (WINDOW_WIDTH - 32 - 8) / 2 }}>
                    <Text style={[styles.fontLabel]}>Время</Text>
                    <DropDownPicker
                      schema={{
                        label: "view",
                        value: "periodId",
                      }}
                      style={{
                        width: "100%",
                        height: 48,
                        borderRadius: 10,
                        borderWidth: 0,
                        paddingHorizontal: 17,
                        ...wrappers.rowCenteredWrapper,
                        //alignItems: 'flex-start',
                        justifyContent: "flex-start",
                      }}
                      value={period}
                      onOpen={() => {
                        setPeriods([]);
                        if (houseNumber) {
                          deliveryOption();
                        }
                      }}
                      items={periods}
                      disableLocalSearch={false} // required for remote search
                      setValue={setPeriod}
                      open={datePickerOpen}
                      loading={dateLoading}
                      setOpen={setDatePickerOpen}
                      zIndex={3000}
                      ListEmptyComponent={({
                        listMessageContainerStyle,
                        listMessageTextStyle,
                        ActivityIndicatorComponent,
                        loading,
                        message,
                      }) => (
                        <View style={listMessageContainerStyle}>
                          {loading ? (
                            <ActivityIndicatorComponent />
                          ) : (
                            <Text style={listMessageTextStyle}>
                              Type to search
                            </Text>
                          )}
                        </View>
                      )}
                    />
                  </ScrollView>
                  {/* <InputWithLabel
              label={'Время'}
              value={time}
              onChange={setTime}
              keyboardType={'numeric'}
              style={{width: (WINDOW_WIDTH - 32 - 8) / 2}}
            /> */}
                </View>
              ) : null}

              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                minimumDate={new Date()}
                onConfirm={(value) => {
                  setOpen(false);
                  setDate(value);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <View
                style={[
                  wrappers.rowStretchedHorizontalWrapper,
                  { marginTop: 12 },
                ]}
              >
                <Text style={[fonts.font16bold]}>{"Стоимость заказа"}</Text>
                <Text style={[fonts.font16bold]}>{`${bag.cartPrice}₽`}</Text>
              </View>
              {type === DELIVERY ? (
                <View style={[styles.priceWrapper, { marginTop: 15 }]}>
                  <Text style={[fonts.font16bold]}>{"Доставка"}</Text>
                  <Text style={[fonts.font16bold]}>{`${
                    order?.deliveryPrice || 0
                  }₽`}</Text>
                </View>
              ) : null}
              <View
                style={[
                  wrappers.rowStretchedHorizontalWrapper,
                  { marginTop: 16, paddingBottom: 16 },
                ]}
              >
                <Text style={fonts.font20bold}>{"К оплате"}</Text>
                <Text style={fonts.font20bold}>{`${
                  type === DELIVERY
                    ? (order?.deliveryPrice || 0) + bag.cartPrice
                    : bag.cartPrice
                }₽`}</Text>
              </View>
              <View style={{ height: 50 }} />
            </View>
          ) : null}
          <View style={{ height: 71 + getBottomSpace() }} />
        </KeyboardAwareScrollView>
        <View style={styles.bottomBarWrapper}>
          <View style={{ width: 65 }}>
            <Text style={styles.fontPrice}>{`${
              type === DELIVERY
                ? (order?.deliveryPrice || 0) + bag.cartPrice
                : bag.cartPrice
            }Р`}</Text>
            <Text style={[fonts.font12bold, { marginTop: 6 }]}>{"Итого"}</Text>
          </View>

          <View style={[styles.buttonWrapper]}>
            {/*<Image*/}
            {/*  style={{height: 30, width: 60, marginRight: 5}}*/}
            {/*  source={require('../../assets/images/spb-logo-image.png')}*/}
            {/*/>*/}
            {loader ? (
              <View style={{ width: WINDOW_WIDTH * 0.5573 }}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : validUser ? (
              deliverable ? (
                <ButtonRed
                  onPress={() => placeOrderDateTime()}
                  style={{ width: WINDOW_WIDTH * 0.5573 }}
                  disabled={!(type === BOOKTABLE ? true : order && period)}
                  label={"Оплатить"}
                />
              ) : (
                <ButtonRed
                  onPress={() => isDeliverable()}
                  style={{ width: WINDOW_WIDTH * 0.5573 }}
                  label={
                    type === DELIVERY &&
                    houseNumber &&
                    streetData &&
                    phoneNumber &&
                    name &&
                    period &&
                    deliveryDate
                      ? "Оплатить"
                      : "Далее"
                  }
                  disabled={
                    (houseNumber &&
                      streetData &&
                      phoneNumber &&
                      name &&
                      period &&
                      deliveryDate) ||
                    type === RESTAURANT ||
                    BOOKTABLE
                      ? false
                      : true
                  }
                />
              )
            ) : (
              <ButtonRed
                onPress={() => checkUser()}
                style={{ width: WINDOW_WIDTH * 0.5573 }}
                label={"Далее"}
              />
            )}
          </View>
        </View>
        {/* <View style={{height: 50}} /> */}
      </KeyboardAvoidingView>
    );
  })
);

const styles = StyleSheet.create({
  priceWrapper: {
    borderBottomWidth: 1,
    borderColor: LIGHT_GRAY_2,
    paddingBottom: 16,
    ...wrappers.rowStretchedHorizontalWrapper,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    //width: '80%',
    justifyContent: "flex-end",
  },
  fontPrice: {
    ...fonts.font20bold,
  },
  fontLabel: {
    ...fonts.font16bold,
    marginBottom: 8,
  },
  bottomBarWrapper: {
    backgroundColor: WHITE,
    position: "absolute",
    height: 71 + getBottomSpace(),
    width: WINDOW_WIDTH,
    // marginTop: WINDOW_HEIGHT - 118 - getBottomSpace(), SE
    // marginTop: WINDOW_HEIGHT - 150 - getBottomSpace(),
    bottom: 0,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10 + getBottomSpace(),
    ...wrappers.rowStretchedWrapper,
  },
  wrapper: {
    height: WINDOW_HEIGHT - getBottomSpace() - 130 - 71 - 30,
    flexGrow: 1,
  },
});

export default DeliveryScreen;
