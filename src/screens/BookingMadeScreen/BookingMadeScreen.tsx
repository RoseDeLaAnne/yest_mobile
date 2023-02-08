import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

import StatusBar from '../../components/StatusBar';
import ButtonBack from '../../components/ButtonBack';
import ButtonRed from '../../components/ButtonRed';

import {WINDOW_HEIGHT, wrappers} from '../../utils/style';
import {fonts} from '../../constants/styles';
import {GRAY, LIGHT_GRAY} from '../../assets/colors';
import {BOOKINGHISTORY} from '../../utils/navigation';

const BookingMadeScreen = ({navigation, route}) => {
  return (
    <View style={styles.wrapper}>
      <StatusBar />
      <View style={wrappers.rowAlignedWrapper}>
        <ButtonBack onPress={() => navigation.goBack()} />
        <Text style={[fonts.font16bold, {marginLeft: 16}]}>
          {'Забронировать стол'}
        </Text>
      </View>
      <View
        style={{
          height: WINDOW_HEIGHT - 195 - getBottomSpace(),
          justifyContent: 'space-between',
        }}>
        <View style={wrappers.centeredWrapper}>
          <Image
            source={require('../../assets/images/eating-together.png')}
            style={styles.image}
          />
          <Text
            style={[
              fonts.font22extrabold,
              {marginTop: 35, textAlign: 'center'},
            ]}>
            {'Спасибо, ваша бронь\nстола оформлена!'}
          </Text>
          <View style={[wrappers.rowCenteredWrapper, {marginTop: 12}]}>
            <Text
              style={[
                fonts.font16semibold,
                {color: GRAY, textAlign: 'center'},
              ]}>
              {'Ожидайте подтверждение\nсообщением'}
            </Text>
          </View>
        </View>
      </View>
      <ButtonRed
        onPress={() => navigation.navigate(BOOKINGHISTORY)}
        label={'История заказов'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 196,
    width: 234,
    marginTop: 82,
  },
  wrapper: {
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 14,
  },
});

export default BookingMadeScreen;
