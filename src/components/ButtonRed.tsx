import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import { BLACK, LIGHT_GRAY, LIGHT_GRAY_2, LIGHT_GRAY_3, RED, WHITE } from "../assets/colors";
import {wrappers} from '../utils/style';
import {fonts} from '../constants/styles';

const ButtonRed: React.FC<{
  style?: object;
  styleLabel?: object;
  onPress: () => void;
  label: string;
  type?: 'red' | 'gray';
  disabled: boolean;
}> = ({style, onPress, label, styleLabel, disabled, type = 'red'}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      disabled={disabled}
      style={[
        styles.buttonWrapper,
        type === 'gray' && {backgroundColor: LIGHT_GRAY},
        disabled && {backgroundColor: LIGHT_GRAY_2},
        style,
      ]}>
      <Text
        style={[
          fonts.font16bold,
          {color: type === 'red' ? (disabled ? LIGHT_GRAY_3 : WHITE) : BLACK},
          styleLabel,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    height: 48,
    width: '100%',
    backgroundColor: RED,
    borderRadius: 10,
    ...wrappers.centeredWrapper,
  },
});

export default ButtonRed;
