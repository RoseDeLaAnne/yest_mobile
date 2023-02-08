import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
// import TextInputMask from 'react-native-text-input-mask';
import {LIGHT_GRAY_2} from '../assets/colors';
import {fonts} from '../constants/styles';
import {icon40, wrappers} from '../utils/style';

const InputWithLabel: React.FC<{
  style?: object;
  inputStyle?: object;
  fontStyle?: object;
  fontLabelStyle?: object;
  onChange: (value: string) => void;
  label: string;
  value: string;
  defaultValue?: string;
  placeholder?: string;
  inputPhone?: boolean;
  showEdit?: boolean;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'visible-password';
}> = ({
  style,
  inputStyle,
  fontStyle,
  fontLabelStyle = {},
  onChange,
  label,
  value,
  defaultValue,
  placeholder = '',
  keyboardType = 'default',
  inputPhone = false,
  showEdit = false,
}) => {
  return (
    <View style={style}>
      {label && <Text style={[styles.fontLabel, fontLabelStyle]}>{label}</Text>}
      <View style={[styles.wrapper, inputStyle]}>
        {inputPhone && <Text style={styles.font7}>{'+7'}</Text>}
        <TextInput
          style={[styles.fontInput, fontStyle]}
          defaultValue={defaultValue}
          keyboardType={keyboardType}
          placeholder={placeholder}
          value={value}
          onChangeText={value1 => onChange(value1)}
        />
        {showEdit && (
          <Image
            source={require('../assets/icons/edit-icon.png')}
            style={icon40}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  font7: {
    ...fonts.font16semibold,
    // paddingHorizontal: 17,
    // paddingVertical: -,
    marginBottom: 4.8,
  },
  fontInput: {
    ...fonts.font16semibold,
    // paddingHorizontal: 17,
    paddingVertical: 13,
    marginBottom: 3,
    width: '90%',
  },
  fontLabel: {
    ...fonts.font16bold,
    marginBottom: 8,
  },
  wrapper: {
    width: '100%',
    height: 48,
    backgroundColor: LIGHT_GRAY_2,
    borderRadius: 10,
    paddingHorizontal: 17,
    ...wrappers.rowCenteredWrapper,
    //alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default InputWithLabel;
