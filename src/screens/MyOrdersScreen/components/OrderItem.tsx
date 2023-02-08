import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { fonts } from "../../../constants/styles";
import DataStore from "../../../stores/DataStore";
import { emptyImageProduct, emptyImageRestaurant } from "../../../utils/style";
import { urlShops } from "../../../utils/utils";
import { urlProducts } from "../../../utils/utils";

const getNormalDateTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  return `${day}.${month}.${year} ${hours}:${minutes.substr(-2)}`;
};

const getImage = (uri: string, emptySource: object = emptyImageRestaurant) => {
  if (uri && uri !== "") {
    return { uri: urlShops + uri };
  } else {
    return emptySource;
  }
};

const OrderCancel = () => (
  <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <Image
      source={require("../../../assets/icons/cancel.png")}
      style={{ height: 11, width: 11, marginRight: 6 }}
    />
    <Text
      style={{
        ...fonts.font12bold,
        color: "#F0264A",
      }}
    >
      {"отменен"}
    </Text>
  </View>
);

const OrderDelivered = () => (
  <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <Image
      source={require("../../../assets/icons/deliver.png")}
      style={{ height: 10, width: 13, marginRight: 6 }}
    />
    <Text
      style={{
        ...fonts.font12bold,
        color: "#67C00D",
      }}
    >
      {"доставлен"}
    </Text>
  </View>
);

const OrderItem = ({ fakeData, shopName, shopImage }) => {

  // const [product, setProduct] = React.useState([]);
  const productName = React.useRef("");
  const { getShopDetailss, getProduct } = DataStore;

  // const jope = async (productId: string) => {
  //   const res = await getProduct(productId);
  //   return res?.productInfo;
  // };

  // useEffect(() => {
  //   if (fakeData?.products?.length > 0) {
  //     fakeData?.products?.map((item) => {
  //       console.log('item',item.productId);
  //       jope('db12b3e8-95fc-11eb-850a-0050569dbef0').then((res) => {
          
  //         setProduct((prev) => [...prev, res]);
  //         console.log('products',res);
  //       });
  //     });
  //   }
  // }, []);
  // useEffect(() => {
  //   console.log(product);
  // }, [product]);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 14,
        padding: 10,
        marginBottom: 16,
      }}
    >
      {fakeData.status != "canceled" ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {fakeData.status === "accepted" ? (
              <Image
                style={{ height: 45, width: 45 }}
                source={require("../../../assets/statuses/acceptgreen.png")}
              />
            ) : (
              <Image
                style={{ height: 45, width: 45 }}
                source={require("../../../assets/statuses/acceptgrey.png")}
              />
            )}
            <Text
              style={[
                fakeData.status === "accepted"
                  ? styles.textGreen
                  : styles.textGrey,
                { width: 48 },
              ]}
            >
              {"Заказ принят"}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {fakeData.status === "cooking" ? (
              <Image
                style={{ height: 45, width: 45 }}
                source={require("../../../assets/statuses/cookedyellow.png")}
              />
            ) : fakeData.status === "packed or in delivery" ||
              fakeData.status === "completed" ? (
              <Image
                style={{ height: 45, width: 45 }}
                source={require("../../../assets/statuses/cookedgrey.png")}
              />
            ) : (
              <Image
                style={{ height: 45, width: 45 }}
                source={require("../../../assets/statuses/cookedblack.png")}
              />
            )}

            <Text
              style={[
                fakeData.status === "cooking"
                  ? styles.textYellow
                  : fakeData.status === "packed or in delivery" ||
                    fakeData.status === "completed"
                  ? styles.textGrey
                  : styles.textBlack,
                { width: 61 },
              ]}
            >
              {"Заказ готовится"}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {fakeData.status === "packed or in delivery" ? (
              <Image
                style={{ height: 45, width: 45 }}
                source={require("../../../assets/statuses/deliveryyellow.png")}
              />
            ) : fakeData.status === "completed" ? (
              <Image
                style={{ height: 45, width: 45 }}
                source={require("../../../assets/statuses/delivetygrey.png")}
              />
            ) : (
              <Image
                style={{ height: 45, width: 45 }}
                source={require("../../../assets/statuses/deliveryblack.png")}
              />
            )}
            <Text
              style={[
                fakeData.status === "packed or in delivery"
                  ? styles.textYellow
                  : fakeData.status === "completed"
                  ? styles.textGrey
                  : styles.textBlack,
                { width: 48 },
              ]}
            >
              {"Заказ в пути"}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {fakeData.status === "completed" ? (
              <Image
                style={{ height: 45, width: 45 }}
                source={require("../../../assets/statuses/finishgreen.png")}
              />
            ) : (
              <Image
                style={{ height: 45, width: 45 }}
                source={require("../../../assets/statuses/finishblack.png")}
              />
            )}
            <Text
              style={[
                fakeData.status === "completed"
                  ? styles.textGreen
                  : styles.textBlack,
                { width: 68 },
              ]}
            >
              {"Заказ доставлен"}
            </Text>
          </View>
        </View>
      ) : null}
    {fakeData.status != "canceled" ? (
      <View
        style={{
          borderWidth: 1,
          borderColor: "#F3F3F3",
          borderRadius: 10,
        }}
      />
    ) : null}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <Image
          source={getImage(shopImage)}
          style={{
            height: 72,
            width: 72,
            borderRadius: 10,
            resizeMode: "cover",
          }}
        />
        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={[fonts.font16bold, { marginBottom: 8 }]}>
            {`${fakeData.organizationInfo.name}`}
          </Text>
          <Text
            style={{
              ...fonts.font12semibold,
              color: "rgba(136, 136, 136, 1)",
              marginBottom: 8,
            }}
          >
            {`${getNormalDateTime(fakeData.orderDate)}`}
          </Text>
          {fakeData.status === "canceled" ? <OrderCancel /> : null}
        </View>
        <View>
          <Text style={fonts.font16bold}>{`${fakeData?.payment?.total}₽`}</Text>
        </View>
      </View>

      <View style={{ display: "flex", flexDirection: "column", marginTop: 25 }}>
        <Text style={[fonts.font12, { marginBottom: 4 }]}>
          {`Заказ № ${fakeData.orderNumber}`}
        </Text>
        <Text style={[fonts.font16bold, { marginBottom: 16 }]}>
          {"Состав заказа"}
        </Text>
        {fakeData?.products?.map((item, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image
                source={{ uri: urlProducts + item?.productInfo?.image }}
                defaultSource={emptyImageProduct}
                style={{
                  height: 32,
                  width: 32,
                  borderRadius: 10,
                  marginRight: 10,
                  resizeMode: "cover",
                  display: "flex",
                  flexDirection: "row",
                }}
              />
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text style={fonts.font12bold}>{item?.productInfo?.name}</Text>
                <Text style={fonts.font12}>{`${item.count}`}</Text>
              </View>
            </View>
            <View>
              <Text style={fonts.font12bold}>{`${item.sum}₽`}</Text>
            </View>
          </View>
        ))}
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#F3F3F3",
          borderRadius: 10,
          marginTop: 10,
          borderStyle: "dashed",
        }}
      />
      <View style={{ display: "flex", flexDirection: "column", marginTop: 24 }}>
        <Text style={[fonts.font16bold, { marginBottom: 10 }]}>
          {"Доставка и оплата"}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text style={fonts.font12bold}>{"Стоимость товаров"}</Text>
          <Text
            style={fonts.font12bold}
          >{`${fakeData?.payment?.productSum}₽`}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={fonts.font12bold}>{"Стоимость доставки"}</Text>
          <Text
            style={fonts.font12bold}
          >{`${fakeData?.payment?.deliverySum}₽`}</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;
const styles = StyleSheet.create({
  textGreen: {
    ...fonts.font12bold,
    color: "#67C00D",
    textAlign: "center",
  },
  textBlack: {
    ...fonts.font10bold,
    textAlign: "center",
  },
  textGrey: {
    ...fonts.font10bold,
    color: "#888888",
    textAlign: "center",
  },
  textYellow: {
    ...fonts.font10bold,
    color: "#FFB800",
    textAlign: "center",
  },
});
