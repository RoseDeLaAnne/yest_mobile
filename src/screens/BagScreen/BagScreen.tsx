import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Switch,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import StatusBar from "../../components/StatusBar";
import ButtonBack from "../../components/ButtonBack";
import ProductItem from "./components/ProductItem";
import RecommendedProduct from "../../components/RecommendedProduct";
import ButtonRed from "../../components/ButtonRed";
import InputWithLabel from "../../components/InputWithLabel";
import EmptyBag from "./components/EmptyBag";
import ClearBagModal from "./components/ClearBagModal";

import {
  BLACK,
  GRAY,
  GREEN,
  LIGHT_GRAY,
  LIGHT_GRAY_2,
  WHITE,
} from "../../assets/colors";
import {
  icon20,
  icon28,
  icon30,
  icon40,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  wrappers,
} from "../../utils/style";
import { fonts } from "../../constants/styles";
import {
  BOOKTABLE,
  DELIVERY,
  ORDERPROCESSED,
  RESTAURANT,
  RESTAURANTS,
} from "../../utils/navigation";
import {
  getBottomSpace,
  getStatusBarHeight,
  isIphoneX,
} from "react-native-iphone-x-helper";
import EnterPromoCodeModal from "./components/EnterPromoCodeModal";
import { inject, observer } from "mobx-react";
import { IAuthStore } from "../../stores/AuthStore";
import { IDataStore } from "../../stores/DataStore";
import MaskInput from "react-native-mask-input";
import { showAlertError } from "../../utils/utils";

const RenderContent: React.FC<{
  route: any;
  phone: string;
  setPhone: any;
  noOfPeople: number;
  setNoOfPeople: any;
}> = inject(
  "authStore",
  "dataStore"
)(
  observer(
    ({
      navigation,
      authStore,
      dataStore,
      route,
      phone,
      setPhone,
      noOfPeople,
      setNoOfPeople,
    }) => {
      let [showPromo, setShowPromo] = useState(false);
      const [bag, setBag] = useState(null);
      const { type, shop, cart, pushToCart, clearCart, setCountP } = dataStore;

      useEffect(() => {
        handleCart();
      }, [cart]);
      // useEffect(() => {
      //   handleCart();
      //   console.log('useEffect0')
      //   // setShowClearBag(true);
      // }, []);

      // call function when navigate to this screen
      // useEffect(() => {
      //   const unsubscribe = navigation.addListener("focus", () => {
      //     handleCart();
      //     console.log('lolkek')
      //   });
      //   return unsubscribe;
      // }, [navigation]);

      const handleCart = () => {
        if(!cart?.length) {
          setBag(null);
          console.log("setCart", cart);
        }
        if (cart != null) {
          const shopIndex = cart.findIndex(
            (c) => c.organizationInfo.uuid === shop.uuid
          );
          if (shopIndex > -1) {
            setBag(cart[shopIndex]);
          }
        }else {
        setBag(null);

      }
      };

      const updateItemCount = (uuid: string, number: number) => {
        console.log("==-=-");
        pushToCart(uuid, number);
      };

      return (
        <>
          <View style={{ marginTop: 24 }}>
            {bag
              ? bag.cart.map((c) => (
                  <ProductItem item={c} updateCoint={updateItemCount} />
                ))
              : null}
          </View>
          {type === BOOKTABLE && (
            <>
              <View style={[wrappers.rowStretchedWrapper, { marginTop: 14 }]}>
                <View style={wrappers.rowCenteredWrapper}>
                  <Image
                    source={require("../../assets/icons/fork-black-icon.png")}
                    style={icon40}
                  />
                  <Text style={[fonts.font16bold, { marginLeft: 4 }]}>
                    {"Приборы"}
                  </Text>
                </View>
                <View style={styles.countWrapper}>
                  <TouchableOpacity
                    style={styles.buttonCount}
                    onPress={() => {
                      if (noOfPeople > 0) {
                        setNoOfPeople(noOfPeople - 1);
                        setCountP(noOfPeople);
                        console.log("noOfPeople", noOfPeople);

                      }
                    }}
                  >
                    <Image
                      source={require("../../assets/icons/minus-icon.png")}
                      style={icon30}
                    />
                  </TouchableOpacity>
                  <Text style={styles.fontCount}>{noOfPeople}</Text>
                  <TouchableOpacity
                    style={styles.buttonCount}
                    onPress={() => {
                      setNoOfPeople(noOfPeople + 1);
                      setCountP(noOfPeople );

                    }}
                  >
                    <Image
                      source={require("../../assets/icons/plus-icon.png")}
                      style={icon30}
                    />
                  </TouchableOpacity>
                </View>
                {/*<Switch*/}
                {/*  style={{width: 51, height: 31}}*/}
                {/*  // onValueChange={toggleSwitch}*/}
                {/*  value={!true}*/}
                {/*/>*/}
              </View>
              {/* <Image
                source={require("../../assets/images/thanks-message-image.png")}
                style={{
                  width: WINDOW_WIDTH - 32,
                  height: WINDOW_WIDTH * 0.1466,
                }}
              /> */}
              {/* <TouchableOpacity style={styles.deliveryButton}>
              <View style={wrappers.rowCenteredWrapper}>
                <Image
                  source={require('../../assets/icons/delivery-icon.png')}
                  style={icon20}
                />
                <Text style={[fonts.font16semibold, {marginLeft: 8}]}>
                  {'Доставка'}
                </Text>
              </View>
              <Text style={[fonts.font16bold, {color: GREEN}]}>
                {bag?.deliveryPrice ? bag?.deliveryPrice : 'Бесплатно'}
              </Text>
            </TouchableOpacity> */}
            </>
          )}
          {type === DELIVERY && (
            <>
              <View style={[wrappers.rowStretchedWrapper, { marginTop: 14 }]}>
                <View style={wrappers.rowCenteredWrapper}>
                  <Image
                    source={require("../../assets/icons/fork-black-icon.png")}
                    style={icon40}
                  />
                  <Text style={[fonts.font16bold, { marginLeft: 4 }]}>
                    {"Приборы"}
                  </Text>
                </View>
                <View style={styles.countWrapper}>
                  <TouchableOpacity
                    style={styles.buttonCount}
                    onPress={() => {
                      if (noOfPeople > 0) {
                        setNoOfPeople(noOfPeople - 1);
                        setCountP(noOfPeople );
                        console.log("noOfPeople", noOfPeople);
                      }
                    }}
                  >
                    <Image
                      source={require("../../assets/icons/minus-icon.png")}
                      style={icon30}
                    />
                  </TouchableOpacity>
                  <Text style={styles.fontCount}>{noOfPeople}</Text>
                  <TouchableOpacity
                    style={styles.buttonCount}
                    onPress={() => {
                      setNoOfPeople(noOfPeople + 1);
                      setCountP(noOfPeople );
                      console.log("noOfPeople", noOfPeople);
                    }}
                  >
                    <Image
                      source={require("../../assets/icons/plus-icon.png")}
                      style={icon30}
                    />
                  </TouchableOpacity>
                </View>
                {/*<Switch*/}
                {/*  style={{width: 51, height: 31}}*/}
                {/*  // onValueChange={toggleSwitch}*/}
                {/*  value={!true}*/}
                {/*/>*/}
              </View>
              {/* <Image
                source={require("../../assets/images/thanks-message-image.png")}
                style={{
                  width: WINDOW_WIDTH - 32,
                  height: WINDOW_WIDTH * 0.1466,
                }}
              /> */}
              {/* <TouchableOpacity style={styles.deliveryButton}>
              <View style={wrappers.rowCenteredWrapper}>
                <Image
                  source={require('../../assets/icons/delivery-icon.png')}
                  style={icon20}
                />
                <Text style={[fonts.font16semibold, {marginLeft: 8}]}>
                  {'Доставка'}
                </Text>
              </View>
              <Text style={[fonts.font16bold, {color: GREEN}]}>
                {bag?.deliveryPrice ? bag?.deliveryPrice : 'Бесплатно'}
              </Text>
            </TouchableOpacity> */}
            </>
          )}
          {/* <Text style={[fonts.font16bold, {marginTop: 10}]}>{'Рекомендуем'}</Text> */}

          {type !== DELIVERY ? (
            <>
              <View style={{}}>
                {/* <Text style={styles.fontLabelPhone}>{"Номер телефона"}</Text>
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
                  value={phone}
                  keyboardType={"numeric"}
                  placeholder=""
                  onChangeText={(masked, unmasked, obfuscated) => {
                    const text = unmasked.startsWith("7")
                      ? unmasked.substring(1)
                      : unmasked;
                    setPhone(text); // you can use the unmasked value as well
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
                /> */}
                <Text style={[styles.fontLabelPhone, { color: BLACK }]}>
                  {"Промокод"}
                </Text>
                {/*<InputWithLabel*/}
                {/*  style={{marginTop: 8}}*/}
                {/*  inputStyle={{*/}
                {/*    borderColor: GREEN,*/}
                {/*    borderWidth: 1,*/}
                {/*    borderStyle: 'dashed',*/}
                {/*    backgroundColor: LIGHT_GRAY,*/}
                {/*  }}*/}
                {/*  fontStyle={{color: GREEN}}*/}
                {/*/>*/}
                <TouchableOpacity
                  style={{
                    borderColor: GREEN,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    backgroundColor: LIGHT_GRAY,
                    width: "100%",
                    height: 48,
                    //backgroundColor: LIGHT_GRAY_2,
                    borderRadius: 10,
                    paddingHorizontal: 17,
                    ...wrappers.rowStretchedWrapper,
                    marginTop: 8,
                  }}
                  onPress={() => setShowPromo(!showPromo)}
                >
                  <Text>{""}</Text>
                </TouchableOpacity>
                <View style={styles.priceWrapper}>
                  <Text style={[styles.fontLabelPhone, { color: BLACK }]}>
                    {"Стоимость заказа"}
                  </Text>
                  <Text style={[styles.fontLabelPhone, { color: BLACK }]}>
                    {`${bag?.cartPrice}₽`}
                  </Text>

                </View>
                <View
                  style={[
                    wrappers.rowStretchedHorizontalWrapper,
                    { marginTop: 16, paddingBottom: 16 },
                  ]}
                >
                  <Text style={fonts.font20bold}>{"К оплате"}</Text>
                  <Text style={fonts.font20bold}>{`${bag?.cartPrice}₽`}</Text>
                </View>
              </View>
              <View style={{ height: 14 }} />
            </>
          ) : null}
          <EnterPromoCodeModal
            showModal={showPromo}
            setShowModal={setShowPromo}
          />
        </>
      );
    }
  )
);

const BagScreen: React.FC<{
  route: any;
  navigation: any;
}> = inject(
  "authStore",
  "dataStore"
)(
  observer(({ navigation, authStore, dataStore, route }) => {
    let [showButtonBag, setShowButtonBag] = useState(false);
    let [showEmptyBag, setShowEmptyBag] = useState(true);
    let [showClearBag, setShowClearBag] = useState(false);
    let [noOfPeople, setNoOfPeople] = useState(0);
    const [bag, setBag] = useState(null);
    const [phone, setPhone] = useState("");
    const {
      type,
      shop,
      cart,
      setCart,
      placeTableOrder,
      removeCart,
      pushToCart,
    } = dataStore;

    useEffect(() => {
      handleCart();
      // setShowClearBag(true);
    }, [cart]);
    // useEffect(() => {
    //   const unsubscribe = navigation.addListener("focus", () => {
    //     handleCart();
    //     console.log('lolkek')
    //   });
    //   return unsubscribe;
    // }, [navigation]);
    // useEffect(() => {
    //   handleCart();
    //   console.log('useEffect1')
    //   // setShowClearBag(true);
    // }, []);

    const handleCart = () => {
      console.log("cart", cart);
      if(!cart?.length) {
        setBag(null);
        console.log("setCart", cart);
      }
      if (cart != null) {
        const shopIndex = cart.findIndex(
          (c) => c.organizationInfo.uuid === shop?.uuid
        );
        if (shopIndex > -1) {
          setBag({ ...cart[shopIndex], phone });
        }
      } else {
        setBag(null);
        console.log("setCart2", cart);
 
      }
    };

    // const handleClearBag = () => {
    //   console.log("clear bags");
    //   console.log("cart", cart);

    //   const shopIndex = cart.findIndex(
    //     (c) => c.organizationInfo.uuid === shop?.uuid
    //   );
    //   if (shopIndex > -1) {
    //     cart.splice(shopIndex, 1);
    //     setCart(cart);
    //     setBag(null);
    //     setShowEmptyBag(true);
    //     setShowClearBag(false);
    //     setShowButtonBag(false);
    //   }
    // };
    const handleClearBag = () => {
      console.log("strart nfvbnfmd,");
      if (cart != null) {
        const shopIndex = cart.findIndex(
          (c) => c.organizationInfo.uuid === shop?.uuid
        );
        setCart(null);
        setBag(null);
        removeCart();
      }
      // clearCart();
 
 

    };              

    useEffect(() => {
      console.debug("getBottomSpace " + getBottomSpace() + isIphoneX());
      console.debug("getBottomSpace " + getStatusBarHeight());
    }, []);
      // TODO remove
    const handleTableOrder = () => {
      // navigation.navigate(type, { from: RESTAURANT, bag });
      // console.log(type,'type' )

        // showAlertError(response.data.message);
        // navigation.navigate(ORDERPROCESSED);
        navigation.navigate(DELIVERY, { from: RESTAURANT, bag });
        // console.log("ghghgh")
    
    };
 
    return (
      <>
        <View >
          <StatusBar />
          <View
            style={[
              wrappers.rowStretchedHorizontalWrapper,
              { paddingHorizontal: 14 },
            ]}
          >
            <ButtonBack onPress={() => navigation.goBack()} />
            <TouchableOpacity
              onPress={() => setShowClearBag(!showClearBag)}
              style={{ marginTop: 6, marginRight: 8 }}
            >
              <Image
                source={require("../../assets/icons/trash-icon.png")}
                style={icon28}
              />
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            style={styles.wrapper}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[fonts.font28bold, { marginTop: 24 }]}>
              {"Корзина"}
            </Text>
            {bag != null ? (
              <RenderContent
                route={route}
                phone={phone}
                setPhone={setPhone}
                noOfPeople={noOfPeople}
                setNoOfPeople={setNoOfPeople}
              />

            ) : (
              <EmptyBag onPress={() => navigation.navigate(RESTAURANTS)} />
            )}
          </KeyboardAwareScrollView>
          {bag != null ? (
            type !== DELIVERY ? (
              <View style={styles.bottomBarWrapper}>
                <View style={{ width: 65 }}>
                  <Text style={styles.fontPrice}>{`${bag.cartPrice}₽`}</Text>
                  <Text style={[fonts.font12bold, { marginTop: 6 }]}>
                    {"Итого"}
                  </Text>
                </View>
                <View style={[styles.buttonWrapper]}>
                  <Image
                    style={{ height: 30, width: 60, marginRight: 5 }}
                    source={require("../../assets/images/spb-logo-image.png")}
                  />
                  <ButtonRed
                    onPress={() => handleTableOrder()}
                    style={{ width: WINDOW_WIDTH * 0.504 }}
                    label={"Оплатить"}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.bottomBarWrapper}>
                <View style={{ width: 70 }}>
                  <Text style={styles.fontPrice}>{`${bag.cartPrice}₽`}</Text>
                </View>
                <View style={[styles.buttonWrapper]}>
                  <Image
                    style={{ height: 30, width: 60, marginRight: 5 }}
                    source={require("../../assets/images/spb-logo-image.png")}
                  />
                  <ButtonRed
                    onPress={() =>
                      navigation.navigate(DELIVERY, { from: RESTAURANT, bag })
                    }
                    style={{ width: WINDOW_WIDTH * 0.5573 }}
                    label={"Заказать"}
                  />
                </View>
              </View>
            )
          ) : null}
        </View>

        <ClearBagModal
          showModal={showClearBag}
          setShowModal={setShowClearBag}
          // onPressClear={() => data}
          onPressClear={handleClearBag}
        />
      </>
    );
  })
);

const styles = StyleSheet.create({
  fontCount: {
    ...fonts.font12bold,
  },
  countWrapper: {
    ...wrappers.rowStretchedWrapper,
    width: 144,
    marginRight: 11,
  },
  buttonCount: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: WHITE,
    ...wrappers.centeredWrapper,
  },
  deliveryButton: {
    backgroundColor: WHITE,
    height: 48,
    width: WINDOW_WIDTH - 32,
    borderRadius: 10,
    ...wrappers.rowStretchedWrapper,
    paddingHorizontal: 16,
    marginTop: 17,
    marginBottom: 24,
  },
  priceWrapper: {
    borderBottomWidth: 1,
    borderColor: LIGHT_GRAY_2,
    paddingBottom: 16,
    ...wrappers.rowStretchedHorizontalWrapper,
  },
  fontLabelPhone: {
    marginTop: 24,
    ...fonts.font16bold,
    color: GRAY,
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
  bottomBarWrapper: {
    backgroundColor: WHITE,
    position: "absolute",
    height: 71 + getBottomSpace(),
    width: WINDOW_WIDTH,
    // marginTop: WINDOW_HEIGHT - 118 - getBottomSpace(), SE
    marginTop: WINDOW_HEIGHT - 150 - getBottomSpace(),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10 + getBottomSpace(),
    ...wrappers.rowStretchedWrapper,
  },
  wrapper: {
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 14,
    //height: WINDOW_HEIGHT - getBottomSpace() - 130 - 71 - 0,
    height: WINDOW_HEIGHT - getBottomSpace() - 130 - 71 - 30,
  },
});

export default BagScreen;
