import React from 'react';
import {View, StatusBar as Bar} from 'react-native';
import {LIGHT_GRAY} from '../assets/colors';
import {OS_IOS} from '../utils/style';

const StatusBar: React.FC<{}> = () => {
  return (
    <View
      style={{
        width: '100%',
        height: OS_IOS ? 44 : 20,
        backgroundColor: LIGHT_GRAY,
      }}>
      <Bar />
    </View>
  );
};

export default StatusBar;
