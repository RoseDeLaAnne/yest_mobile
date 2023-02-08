import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {inject, observer} from 'mobx-react';

import ButtonBack from '../../components/ButtonBack';
import InputWithLabel from '../../components/InputWithLabel';
import ButtonRed from '../../components/ButtonRed';

import {icon28, OS_IOS, wrappers} from '../../utils/style';
import {GRAY, LIGHT_GRAY, RED} from '../../assets/colors';
import {fonts} from '../../constants/styles';
import {ENTERCODE, PHONE, REGISTRATION} from '../../utils/navigation';
import {getStringValue} from '../../utils/handlers';
import {IAuthStore} from '../../stores/AuthStore';

import { AsyncStorage } from "react-native";

const PhoneScreen: React.FC<{
  navigation: any;
  authStore?: IAuthStore;
}> = inject('authStore')(
  observer(({navigation, authStore}) => {
    const {user, updateUser, auth} = authStore;
    const [phone, setPhone] = React.useState(0);

    const handleChangeInputWithLabel = (value: number | string) => {
      setPhone(value)
      AsyncStorage.setItem('phone', value.toString());
    }

    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.wrapper}
        contentContainerStyle={{
          paddingBottom: OS_IOS ? 60 + getBottomSpace() : 61,
        }}>
        <ButtonBack onPress={() => navigation.goBack()} />
        <Text style={styles.fontProfile}>{'Профиль'}</Text>
        <TouchableOpacity style={[wrappers.rowAlignedWrapper, {marginTop: 27}]}>
          <Image
            source={require('../../assets/icons/bell-badge-icon.png')}
            style={icon28}
          />
          <Text style={styles.fontButtons}>{'Настройка уведомлений'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[wrappers.rowAlignedWrapper, {marginTop: 22}]}>
          <Image
            source={require('../../assets/icons/phone-icon.png')}
            style={icon28}
          />
          <Text style={styles.fontButtons}>{'Служба поддержки'}</Text>
        </TouchableOpacity>
        <View style={[wrappers.centeredWrapper, {marginTop: 44}]}>
          <Image
            style={{height: 151, width: 253}}
            source={require('../../assets/images/login.png')}
          />
        </View>
        <View style={[wrappers.centeredWrapper, {marginTop: 35}]}>
          <Text style={fonts.font22extrabold}>{'Введите номер телефона'}</Text>
          <Text style={[fonts.font16semibold, {color: GRAY, marginTop: 12}]}>
            {'Ваш номер будет использован'}
          </Text>
          <Text style={[fonts.font16semibold, {color: GRAY}]}>
            {'для входа в аккаунт'}
          </Text>
        </View>
        <InputWithLabel
          label={'Номер телефона'}
          style={{marginTop: 24}}
          defaultValue={''}
          keyboardType={'numeric'}
          inputPhone={true}
          value={phone}
          maxLength={10}
          // onChange={value => { 
          //   if(value.length <= 10){ 
          //   setPhone(value);
          //   }
          // }
          onChange={value => { 
            if (value.length <= 10) {
              handleChangeInputWithLabel(value)
            }
          }
          }
        />
        <ButtonRed
          label={'Войти'}
          style={{marginTop: 16}}
          onPress={() =>
            auth(() => navigation.navigate(ENTERCODE, {from: PHONE, phone:phone}),phone)
          }
        />
        <TouchableOpacity onPress={() => navigation.navigate(REGISTRATION)}>
          <Text
            style={[
              fonts.font16semibold,
              {color: RED, marginTop: 12, textAlign: 'center'},
            ]}>
            {'Зарегистрироваться'}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }),
);

const styles = StyleSheet.create({
  fontButtons: {
    marginLeft: 8,
    ...fonts.font16semibold,
  },
  fontProfile: {
    ...fonts.font28bold,
    marginTop: 24,
  },
  wrapper: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 14,
    paddingTop: 44,
    paddingBottom: 44,
  },
});

export default PhoneScreen;
