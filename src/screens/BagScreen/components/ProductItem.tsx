import React, { useState } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {emptyImageProduct, icon30, WINDOW_WIDTH, wrappers} from '../../../utils/style';
import {LIGHT_GRAY, WHITE} from '../../../assets/colors';
import {fonts} from '../../../constants/styles';
import { urlProducts } from '../../../utils/utils';
import ProgressBar from 'react-native-progress/Bar';
const ProductItem = ({item,updateCoint}) => {
  
  let [count, setCount] = useState(item ? item?.productCount : 0);



  const addCount = () => {
    setCount(count + 1);
    updateCoint(item.productInfo.uuid, 1);
    
  };
  const reduceCount = () => {
    setCount(count > 1 ? count - 1 : 0);
    updateCoint(item.productInfo.uuid, -1);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperDescription}>
        
        <Image
          source={{uri: urlProducts + item.productInfo.image}}
          indicator={ProgressBar}
          style={styles.image}
          defaultSource={emptyImageProduct}
          imageStyle={{
            borderTopRightRadius: 14,
            borderTopLeftRadius: 14,
            overflow: 'hidden',
          }}
        />
        <View style={{marginLeft: 13}}>
          <Text style={styles.fontName}>{item.productInfo.name}</Text>
          <Text style={styles.fontDescription}>
            {item.productInfo.description}
          </Text>
        </View>
      </View>
      <View style={[wrappers.rowStretchedWrapper, {marginTop: 10}]}>
        <Text style={fonts.font16bold}>{item.productInfo.price}</Text>
        <View style={styles.countWrapper}>
          <TouchableOpacity style={styles.buttonCount} onPress={()=>reduceCount()}>
            <Image
              source={require('../../../assets/icons/minus-icon.png')}
              style={icon30}
            />
          </TouchableOpacity>
          <Text style={styles.fontCount}>{count}</Text>
          <TouchableOpacity style={styles.buttonCount}  onPress={()=>addCount()}>
            <Image
              source={require('../../../assets/icons/plus-icon.png')}
              style={icon30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fontCount: {
    ...fonts.font12bold,
  },
  buttonCount: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: LIGHT_GRAY,
    ...wrappers.centeredWrapper,
  },
  countWrapper: {
    ...wrappers.rowStretchedWrapper,
    width: 144,
  },
  wrapperDescription: {
    ...wrappers.rowStretchedHorizontalWrapper,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(243, 243, 243, 1)',
  },
  fontName: {
    ...fonts.font16bold,
    width: WINDOW_WIDTH - 130,
  },
  fontDescription: {
    ...fonts.font12semibold,
    width: WINDOW_WIDTH - 130,
    marginTop: 8,
    color: 'rgba(136, 136, 136, 1)',
  },
  image: {
    height: 72,
    width: 72,
    borderRadius: 10,
  },
  wrapper: {
    width: WINDOW_WIDTH - 28,
    borderRadius: 14,
    backgroundColor: WHITE,
    padding: 10,
    marginBottom: 15,
  },
});

export default ProductItem;
