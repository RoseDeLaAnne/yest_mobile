import React, { useEffect, useState } from "react";
import {
  Image as ImageRN,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Image from "react-native-image-progress";
import { LIGHT_GRAY, WHITE } from "../../../assets/colors";
import {
  emptyImageProduct,
  icon30,
  WINDOW_WIDTH,
  wrappers,
} from "../../../utils/style";
import { fonts } from "../../../constants/styles";
import { CartItems, Product } from "../../../api/types";
import { urlProducts } from "../../../utils/utils";

const RecommendedDishes: React.FC<{
  style?: object;
  onPress: () => void;
  onPressAdd: (number) => void;
  onPressMinus: () => void;
  onPressPlus: () => void;
  count?: () => void;
  product: Product;
  isAdded: boolean;
  bag: CartItems;
}> = ({
  style,
  onPress,
  onPressAdd,
  onPressMinus,
  onPressPlus,
  isAdded,
  product,
  item,
  bag,
}) => {
  let [count, setCount] = useState(bag ? bag.productCount : 0);
  const [cartUpating, setCartUpdating] = useState(false);
  const update = () => {
    setTimeout(() => {
      setCartUpdating(true);
      setTimeout(() => {
        setCartUpdating(false);
      }, 1000);
    }, 10);
  };

  const addCount = () => {
    setCount(count + 1);
    onPressAdd(1);
    update();
  };
  const reduceCount = () => {
    setCount(count > 1 ? count - 1 : 0);
    onPressAdd(-1);
    update();
  };
  const PendingCidcle = () => {
    return <ActivityIndicator />;
  };

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.wrapper, style, item === 4 && { marginBottom: 50 }]}
      >
        <Image
          source={{uri: urlProducts + product?.image}}
          indicator={PendingCidcle}
          style={styles.image}
          defaultSource={emptyImageProduct}
          imageStyle={{
            borderTopRightRadius: 14,
            borderTopLeftRadius: 14,
            overflow: "hidden",
          }}
        />
        <View style={styles.wrapperContent}>
          <View>
            <Text style={styles.fontName} numberOfLines={2}>
              {product?.name}
            </Text>
            {product?.weight && (
              <Text style={styles.fontPrice}>{`${product?.weight}${"г"}`}</Text>
            )}
          </View>
          {count === 0 ? (
            <TouchableOpacity style={styles.button} onPress={() => addCount()}>
              <Text style={styles.fontPriceButton}>{`${product.price}₽`}</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.wrapperButtons, { marginTop: 11 }]}>
              <TouchableOpacity
                disabled={cartUpating}
                style={styles.buttonCount}
                onPress={() => reduceCount()}
              >
                <ImageRN
                  style={icon30}
                  source={require("../../../assets/icons/minus-icon.png")}
                />
              </TouchableOpacity>
              <Text style={[fonts.font12bold, { marginTop: 10 }]}>{count}</Text>
              <TouchableOpacity
                style={styles.buttonCount}
                disabled={cartUpating}
                onPress={() => addCount()}
              >
                <ImageRN
                  style={icon30}
                  source={require("../../../assets/icons/plus-icon.png")}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  buttonCount: {
    height: 40,
    width: 40,
    backgroundColor: LIGHT_GRAY,
    ...wrappers.centeredWrapper,
    borderRadius: 10,
  },
  wrapperButtons: {
    ...wrappers.rowStretchedHorizontalWrapper,
  },
  image: {
    width: (WINDOW_WIDTH - 28 - 15) / 2,
    height: 114,
  },
  button: {
    height: 40,
    width: (WINDOW_WIDTH - 28 - 15 - 40) / 2,
    borderRadius: 10,
    backgroundColor: LIGHT_GRAY,
    ...wrappers.centeredWrapper,
    marginTop: 11,
  },
  fontPriceButton: {
    ...fonts.font12bold,
  },
  fontPrice: {
    ...fonts.font12semibold,
    color: "rgba(136, 136, 136, 1)",
    marginTop: 4,
  },
  fontName: {
    ...fonts.font12bold,
    width: (WINDOW_WIDTH - 28 - 15 - 40) / 2,
  },
  wrapperContent: {
    padding: 10,
    justifyContent: "space-between",
    height: 123,
  },
  wrapper: {
    marginRight: 15,
    // height: 237,
    //height: OS_IOS ? 242 : 237,
    width: (WINDOW_WIDTH - 28 - 15) / 2,
    backgroundColor: WHITE,
    borderRadius: 14,
    marginTop: 15,
  },
});

const equal = (prev, next) => {
  if (prev.bag?.productCount !== next.bag?.productCount) {
    return false;
  }

  return true;
};

export default React.memo(RecommendedDishes, equal);
