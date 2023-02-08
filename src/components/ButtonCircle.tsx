import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {icon, icon20, wrappers} from '../utils/style';

const icons = {
  search: require('../assets/icons/search-icon.png'),
  heart: require('../assets/icons/heart-icon.png'),
  redHeart: require('../assets/icons/heart-red-icon.png'),
};

const ButtonCircle: React.FC<{
  style?: object;
  iconType: 'search' | 'heart' | 'redHeart';
  onPress: () => void;
}> = ({style, iconType, onPress}) => {
  return (
    <TouchableOpacity style={[styles.wrapper, style]} onPress={onPress}>
      <Image
        source={icons[iconType]}
        style={iconType === 'search' ? icon : icon20}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    ...wrappers.centeredWrapper,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});

export default ButtonCircle;
