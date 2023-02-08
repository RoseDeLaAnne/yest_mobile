import React from 'react';
import {TouchableOpacity} from 'react-native';
import {WHITE} from '../assets/colors';
import {hitSlop3030} from '../utils/style';

const CloseButton: React.FC<{
  style?: object;
  onPress: () => void;
}> = ({style, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={hitSlop3030}
      style={[
        {
          height: 5,
          width: 42,
          borderRadius: 5,
          backgroundColor: WHITE,
        },
        style,
      ]}
    />
  );
};

export default CloseButton;
