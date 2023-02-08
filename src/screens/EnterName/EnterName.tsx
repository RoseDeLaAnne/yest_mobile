import React,{useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthStore from '../../stores/AuthStore';
import ButtonBack from '../../components/ButtonBack';
import InputWithLabel from '../../components/InputWithLabel';
import ButtonRed from '../../components/ButtonRed';

import {LIGHT_GRAY} from '../../assets/colors';
import {fonts} from '../../constants/styles';
import {WINDOW_HEIGHT, wrappers} from '../../utils/style';
import {PROFILE} from '../../utils/navigation';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const EnterName = ({navigation}) => {
  const {setUserName} = AuthStore;
  const [name, setName] = useState('');

  const onChange = (text:any) => {
    setName(text);
  };



  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.wrapper}>
      <View>
        <ButtonBack onPress={() => navigation.goBack()} />
        <View style={wrappers.centeredWrapper}>
          <Text style={styles.fontProfile}>{'Как вас зовут?'}</Text>
          <InputWithLabel
          value={name}
            style={{marginTop: 24, width: '100%'}}
            defaultValue={'Джон'}
            onChange={onChange}
          />
        </View>
      </View>
      <ButtonRed
        style={{marginTop: WINDOW_HEIGHT - 360 - getBottomSpace()}}
        label={'Продолжить'}
        onPress={() =>{
          setUserName(name);
          navigation.navigate(PROFILE)}}
        // onPress={() => {}}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  fontProfile: {
    ...fonts.font22extrabold,
    marginTop: 24,
  },
  wrapper: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 14,
    paddingTop: 44,
  },
});

export default EnterName;
