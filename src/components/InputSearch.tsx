import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {LIGHT_GRAY_2} from '../assets/colors';
import {fonts} from '../constants/styles';
import {icon28, WINDOW_WIDTH, wrappers} from '../utils/style';

const InputSearch: React.FC<{
  style?: object;
  fontInput?: object;
  onChange: (value: string) => void;
  onFocus: () => void;
  defaultValue?: string;
  placeholder?: string;
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
  fontInput,
  onChange,
  onFocus,
  defaultValue,
  placeholder,
  keyboardType = 'default',
}) => {
  let [value, setValue] = useState(defaultValue);

  const onChangeValue = (valueLocal: string) => {
    setValue(valueLocal);
    onChange && onChange(valueLocal);
  };

  return (
    <View style={[styles.wrapper, style]}>
      <Image
        source={require('../assets/icons/search-icon.png')}
        style={icon28}
      />
      <TextInput
        style={[styles.fontInput, fontInput]}
        defaultValue={defaultValue}
        keyboardType={keyboardType}
        onChangeText={(val: string) => onChangeValue(val)}
        onFocus={onFocus}
        placeholder={placeholder}
        value={value}
      />
      {value !== '' && value !== undefined ? (
        <TouchableOpacity onPress={() => onChangeValue('')}>
          <Image
            source={require('../assets/icons/delete-circle-icon.png')}
            style={icon28}
          />
        </TouchableOpacity>
      ) : (
        <View style={{width: 50}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fontInput: {
    ...fonts.font16semibold,
    paddingHorizontal: 10,
    paddingVertical: 13,
    marginBottom: 3,
    width: WINDOW_WIDTH - 44 - 24 - 30,
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
    ...wrappers.rowStretchedWrapper,
    paddingHorizontal: 8,
  },
});

export default InputSearch;
