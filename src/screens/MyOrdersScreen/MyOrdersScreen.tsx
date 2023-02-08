import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ButtonBack from "../../components/ButtonBack";
import { LIGHT_GRAY } from "../../assets/colors";
import { fonts } from "../../constants/styles";
import { WINDOW_HEIGHT, wrappers, WINDOW_WIDTH } from "../../utils/style";
import OrderItem from "./components/OrderItem";
import DataStore from "../../stores/DataStore";

const MyOrdersScreen = ({ navigation, route}) => {
  const phone = route?.params?.phone;
  const [active, setActive] = useState(true);
  const { getOrdersHistory, loading } = DataStore;
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = React.useState([]);
  const prodict = React.useRef([]);

  const [shopName, setShopName] = React.useState("");
  const [shopImage, setShopImage] = React.useState("");

  const { getShopDetailss, getProduct } = DataStore;
  // const jope = async (productId: string) => {
  //   const res = await getProduct(productId);
  //   return res?.productInfo;
  // };

  const reloadData = async () => {
    const res = await getOrdersHistory(phone);
    setOrders(res);
  };

  useEffect(() => {
    getOrdersHistory(phone).then((res) => {
      setOrders(res);
      // create arrayy of products of all orders and then map it in OrderItem
    });
  }, []);

  useEffect(() => {
    console.log("orders", phone);
    getShopDetailss("a7898941-95f4-11eb-850a-0050569dbef0").then((res) => {
      setShopName(res.name);
      setShopImage(res.logo);
    });
  }, []);
  // useEffect(() => {
  //   if (orders?.products?.length > 0) {
  //     orders?.products?.map((item) => {
  //       jope(item.productId).then((res) => {
  //         // setProduct((prev) => [...prev, res]);
  //         prodict.current.push(res);
  //       });
  //     });
  //   }
  // }, [product]);

  // const getProducList = (orders) =>{
  //   if (orders?.products?.length > 0) {
  //     orders?.products?.map((item) => {
  //       jope(item.productId).then((res) => {
  //         prodict.current.push(res);
  //         // console.log(prodict.current);
  //       });
  //     });

  //   }
  //   return prodict.current;

  // }
  // console.log("getProducList(orders[0]", getProducList(orders[0]));
  // add refetch on finger swipe down

  return (
    <View style={styles.wrapper}>
      <ButtonBack onPress={() => navigation.goBack()} />

      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => reloadData()} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View>
            <Text style={styles.fontProfile}>{"Мои заказы"}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 18.5,
            }}
          >
            <TouchableOpacity
              onPress={() => setActive(true)}
              style={active ? styles.acive : styles.disable}
            >
              <Text style={active ? styles.activeText : styles.disableText}>
                {"На месте"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActive(false)}
              style={!active ? styles.acive : styles.disable}
            >
              <Text style={!active ? styles.activeText : styles.disableText}>
                {"Доставка"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {orders
          .filter((item) => item?.deliveryType === (!active ? "deliveryByCourier" : "pickupByClient"))
          .map((item, index) => (
            <OrderItem
              key={index}
              shopImage={shopImage}
              shopName={shopName}
              fakeData={item}
            />
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fontProfile: {
    ...fonts.font22extrabold,
    marginTop: 24,
    marginBottom: 24,
  },
  wrapper: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 14,
    paddingTop: 24,
  },
  acive: {
    backgroundColor: "#F0264A",
    borderRadius: 54,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    width: WINDOW_WIDTH / 2.2 - 20,
    marginRight: 5,
    marginLeft: 5,
  },
  disable: {
    backgroundColor: "#fff",
    borderRadius: 54,
    width: WINDOW_WIDTH / 2.2 - 20,
    height: 30,
    marginLeft: 5,
    marginRight: 5,

    alignItems: "center",
    justifyContent: "center",
  },
  activeText: {
    ...fonts.font12bold,
    color: "#fff",
  },
  disableText: {
    ...fonts.font12bold,
    color: "#000",
  },
});

export default MyOrdersScreen;
