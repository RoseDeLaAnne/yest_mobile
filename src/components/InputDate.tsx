import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';

import {LIGHT_GRAY_2} from '../assets/colors';
import {fonts} from '../constants/styles';
import {dateFormat, icon40, wrappers} from '../utils/style';

const InputDate: React.FC<{
  style?: object;
  inputStyle?: object;
  fontStyle?: object;
  fontLabelStyle?: object;
  onChange: (value: Number) => void;
  label: string;
  value: string;
  defaultValue?: string;
  placeholder?: string;
  showEdit?: boolean;
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
  showEdit = false,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  //const [value, setValue] = useState(false);

  const onSelected = (valueLocal: Date) => {
    onChange(valueLocal.getTime());
    setShowDatePicker(false);
  };

  return (
    <View style={style}>
      {label && <Text style={[styles.fontLabel, fontLabelStyle]}>{label}</Text>}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={[styles.wrapper, inputStyle]}>
        <>
          <Text style={[styles.fontInput, fontStyle]}>
            {value
              ? moment(value).format(dateFormat)
              : moment().format(dateFormat)}
          </Text>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            onConfirm={value1 => onSelected(value1)}
            onCancel={() => setShowDatePicker(false)}
            cancelTextIOS={'Отмена'}
            confirmTextIOS={'Выбрать'}
          />
        </>
        {showEdit && (
          <Image
            source={require('../assets/icons/edit-icon.png')}
            style={icon40}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fontInput: {
    ...fonts.font16semibold,
    // paddingHorizontal: 17,
    paddingVertical: 13,
    marginBottom: 3,
    width: '100%',
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
    ...wrappers.rowStretchedWrapper,
  },
});

export default InputDate;
