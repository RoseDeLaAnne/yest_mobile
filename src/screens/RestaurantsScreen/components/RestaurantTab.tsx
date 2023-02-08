import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {WINDOW_WIDTH} from '../../../utils/style';
import {fonts} from '../../../constants/styles';
import {WHITE} from '../../../assets/colors';

import {urlShops} from '../../../utils/utils';

const getImage0 = type => {
  if (type === 1) {
    return require('../../../assets/images/restaraunt-image.png');
  } else if (type === 2) {
    return require('../../../assets/images/restaraunt-empty-image.png');
  } else if (type === 3) {
    return require('../../../assets/images/restaraunt-empty-2-image.png');
  }
};

const RestaurantTab = ({type, onPress, item}) => {

  const getImage = () => {
    if (item.logo === '') {
      return require('../../../assets/images/restaraunt-empty-image.png');
    } else {
      return {uri: urlShops + item.logo};
    }
  };

  return (
    <TouchableOpacity key={item.uuid} onPress={onPress} style={styles.wrapper}>
      <Image
        source={getImage()}
        style={styles.image}
        resizeMode={item?.logo ? 'contain' : 'cover'}
      />
      <Text style={styles.fontName}>
        {item?.name ? item?.name : item?.transliteration}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: WINDOW_WIDTH - 28,
    height: 141,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  fontName: {
    ...fonts.font22bold,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 11,
  },
  wrapper: {
    minHeight: 141 + 45,
    width: WINDOW_WIDTH - 28,
    borderRadius: 14,
    backgroundColor: WHITE,
    marginBottom: 16,
  },
});

export default RestaurantTab;
