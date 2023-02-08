import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LIGHT_GRAY_2, LIGHT_GRAY_3, RED, WHITE} from '../assets/colors';
import {fonts} from '../constants/styles';
import {wrappers} from '../utils/style';

const ButtonBag: React.FC<{
  style?: object;
  styleLabel?: object;
  onPress: () => void;
  price: string;
  label?: string;
  disabled: boolean;
}> = ({style, onPress, price, styleLabel, disabled, label = 'Корзина'}) => {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 300);
  }, []);

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.buttonWrapper,
        disabled && {backgroundColor: LIGHT_GRAY_2},
        style,
      ]}>
      <Text
        style={[
          fonts.font16bold,
          {color: loading ? 'rgba(255, 255, 255, 0.5)' : WHITE},
          styleLabel,
        ]}>
        {label}
      </Text>
      {loading ? (
        <Image
          source={require('../assets/icons/loading-icon.png')}
          style={{height: 10, width: 30}}
        />
      ) : (
        <Text
          style={[
            fonts.font16bold,
            {color: disabled ? LIGHT_GRAY_3 : WHITE},
            styleLabel,
          ]}>
          {`${price}Р`}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    height: 48,
    width: '100%',
    backgroundColor: RED,
    borderRadius: 10,
    ...wrappers.rowStretchedWrapper,
    paddingHorizontal: 20,
  },
});

export default ButtonBag;
