import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

import StatusBar from "../../components/StatusBar";
import ButtonBack from "../../components/ButtonBack";
import ButtonRed from "../../components/ButtonRed";

import { LIGHT_GRAY } from "../../assets/colors";
import { WINDOW_HEIGHT, wrappers } from "../../utils/style";
import { fonts } from "../../constants/styles";
import { BOOKINGHISTORY, DELIVERY, RESTAURANT } from "../../utils/navigation";
import { IAuthStore } from "../../stores/AuthStore";
import { IDataStore } from "../../stores/DataStore";
import { inject, observer } from "mobx-react";

const OrderProcessedScreen: React.FC<{
  navigation: any;
  route: any;
  authStore: IAuthStore;
  dataStore: IDataStore;
}> = inject(
  "authStore",
  "dataStore"
)(
  observer(({ navigation, route, authStore, dataStore }) => {
    const [orderId, setOrderId] = React.useState<string>("");
    const { viewCart, getOrderId, getOrderInfo } = dataStore;

    useEffect(() => {
      viewCart();
    }, [viewCart]);

    useEffect(() => {
      getOrderInfo().then((res) => {
        setOrderId(res?.data?.order?.orderNumber)
      });
    }, []);

    return (
      <View style={styles.wrapper}>
        <StatusBar />
        <ButtonBack onPress={() => navigation.goBack()} />
        <View
          style={{
            height: WINDOW_HEIGHT - 195 - getBottomSpace(),
            justifyContent: "space-between",
          }}
        >
          <View style={wrappers.centeredWrapper}>
            {route?.params?.from !== DELIVERY ? (
              <Image
                source={require("../../assets/images/phone.png")}
                style={styles.image}
              />
            ) : (
              <Image
                source={require("../../assets/images/girl-with-bag-green.png")}
                style={styles.image}
              />
            )}
            <Text style={[fonts.font22extrabold, { marginTop: 35 }]}>
              {"Ваш заказ оформлен!"}
            </Text>
            <View style={[wrappers.rowCenteredWrapper, { marginTop: 12 }]}>
              <Text style={fonts.font16semibold}>{"Номер заказа: "}</Text>
              <Text style={fonts.font16bold}>{orderId}</Text>
            </View>
            {route?.params?.from !== DELIVERY && (
              <View style={[wrappers.rowCenteredWrapper, { marginTop: 4 }]}>
                <Text style={fonts.font16semibold}>{"Номер столика: "}</Text>
                <Text style={fonts.font16bold}>{"7"}</Text>
              </View>
            )}
          </View>
        </View>
        <ButtonRed
          onPress={() => navigation.navigate(BOOKINGHISTORY)}
          label={"История заказов"}
        />
      </View>
    );
  })
);

const styles = StyleSheet.create({
  image: {
    height: 189,
    width: 296,
    marginTop: 82,
  },
  wrapper: {
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 14,
  },
});

export default OrderProcessedScreen;
