import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {iconSmall, wrappers} from '../utils/style';
import {WHITE} from '../assets/colors';

const ButtonBack: React.FC<{
  style?: object;
  onPress: () => void;
}> = ({style, onPress}) => {
  return (
    <TouchableOpacity style={[styles.wrapper, style]} onPress={() => onPress()}>
      <Image
        style={iconSmall}
        source={require('../assets/icons/back-icon.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...wrappers.centeredWrapper,
    height: 40,
    width: 40,
    backgroundColor: WHITE,
    borderRadius: 20,
  },
});

export default ButtonBack;
