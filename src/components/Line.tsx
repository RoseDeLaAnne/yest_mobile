import React from 'react';
import {View} from 'react-native';
import {WINDOW_WIDTH} from '../utils/style';

const Line = ({width = WINDOW_WIDTH}) => {
  return (
    <View
      style={{
        height: 1,
        width: width,
        backgroundColor: 'rgba(243, 243, 243, 1)',
      }}
    />
  );
};

export default Line;
