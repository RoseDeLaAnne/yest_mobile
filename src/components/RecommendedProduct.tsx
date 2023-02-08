import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LIGHT_GRAY, WHITE} from '../assets/colors';
import {fonts} from '../constants/styles';
import { OS_IOS, wrappers } from "../utils/style";
import ButtonBag from './ButtonBag';
import ProductModal from './ProductModal';

const RecommendedProduct = () => {
  let [showProductDetails, setShowProductDetails] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => setShowProductDetails(true)}>
        <Image
          source={require('../assets/images/recommendation-product.png')}
          style={{width: 164, height: 114}}
        />
        <View style={styles.wrapperContent}>
          <Text style={styles.fontName} numberOfLines={2}>{'Пицца с ветчиной и грибами'}</Text>
          <Text style={styles.fontPrice}>{'480г'}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.fontPriceButton}>{'465₽'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {showProductDetails && (
        <ProductModal
          showModal={showProductDetails}
          setShowModal={setShowProductDetails}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 144,
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
    color: 'rgba(136, 136, 136, 1)',
    marginTop: 4,
  },
  fontName: {
    ...fonts.font12bold,
  },
  wrapperContent: {
    padding: 10,
  },
  wrapper: {
    marginRight: 15,
    //height: 237,
    height: OS_IOS ? 242 : 237,
    width: 164,
    backgroundColor: WHITE,
    borderRadius: 14,
  },
});

export default RecommendedProduct;
