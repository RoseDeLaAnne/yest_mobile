import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import StatusBar from '../../components/StatusBar';
import { hitSlop2020, icon28, icon40, WINDOW_HEIGHT, WINDOW_WIDTH, wrappers } from "../../utils/style";
import ButtonBack from '../../components/ButtonBack';
import {fonts} from '../../constants/styles';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LIGHT_GRAY, WHITE } from "../../assets/colors";
import { getBottomSpace } from "react-native-iphone-x-helper";
import InputWithLabel from "../../components/InputWithLabel";
import ButtonRed from "../../components/ButtonRed";
import { BOOKINGMADE, DELIVERY } from "../../utils/navigation";

const BookTableScreen = ({navigation}) => {
  return (
    <View>
      <StatusBar />
      <View
        style={[
          wrappers.rowStretchedHorizontalWrapper,
          {paddingHorizontal: 14},
        ]}>
        <View style={wrappers.rowCenteredWrapper}>
          <ButtonBack onPress={() => navigation.goBack()} />
          <Text style={[fonts.font16bold, {marginLeft: 16}]}>
            {'Забронировать стол'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          hitSlop={hitSlop2020}>
          <Image
            source={require('../../assets/icons/point-black-icons.png')}
            style={icon40}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        style={styles.wrapper}
        showsVerticalScrollIndicator={false}>
        <Text style={[fonts.font28bold, {marginTop: 24}]}>{'Грибоедов'}</Text>
        <InputWithLabel
          style={{marginTop: 16}}
          label={'Имя'}
          placeholder={'Введите Имя'}
        />
        <InputWithLabel
          style={{marginTop: 16}}
          label={'Фамилия'}
          placeholder={'Введите Фамилию'}
        />
        <InputWithLabel
          style={{marginTop: 16}}
          label={'Номер телефона'}
          defaultValue={'+7'}
          keyboardType={'numeric'}
        />
        <View style={[wrappers.rowStretchedWrapper, {marginTop: 16}]}>
          <InputWithLabel
            label={'Дата'}
            style={{width: (WINDOW_WIDTH - 32 - 8) / 2}}
            keyboardType={'numeric'}
          />
          <InputWithLabel
            label={'Время'}
            keyboardType={'numeric'}
            style={{width: (WINDOW_WIDTH - 32 - 8) / 2}}
          />
        </View>
        <InputWithLabel
          style={{marginTop: 16}}
          label={'Колличество человек'}
          keyboardType={'numeric'}
          placeholder={'Для двоих'}
        />
        <InputWithLabel
          style={{marginTop: 16}}
          label={'Комментарий'}
          placeholder={'Введите Комментарий'}
        />
        <View style={{height: 30}} />
      </KeyboardAwareScrollView>
      <View style={[styles.bottomBarWrapper]}>
        <ButtonRed
          onPress={() => navigation.navigate(BOOKINGMADE)}
          style={{width: WINDOW_WIDTH - 32}}
          label={'Забронировать'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBarWrapper: {
    backgroundColor: WHITE,
    position: 'absolute',
    height: 71 + getBottomSpace(),
    width: WINDOW_WIDTH,
    // marginTop: WINDOW_HEIGHT - 118 - getBottomSpace(), SE
    marginTop: WINDOW_HEIGHT - 136 - getBottomSpace(),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10 + getBottomSpace(),
    ...wrappers.rowStretchedWrapper,
  },
  wrapper: {
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 14,
    height: WINDOW_HEIGHT - getBottomSpace() - 130 - 76 - 15,
  },
});

export default BookTableScreen;
