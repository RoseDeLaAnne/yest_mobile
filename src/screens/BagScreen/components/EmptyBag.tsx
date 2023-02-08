import React from 'react';
import {Image, Text, View} from 'react-native';
import {fonts} from '../../../constants/styles';
import {wrappers} from '../../../utils/style';
import {GRAY} from '../../../assets/colors';
import ButtonRed from '../../../components/ButtonRed';

const EmptyBag: React.FC<{
  onPress: () => void;
}> = ({onPress}) => {
  return (
    <View style={wrappers.centeredWrapper}>
      <Image
        source={require('../../../assets/images/girl-with-bag.png')}
        style={{height: 124, width: 141, marginTop: 140}}
      />
      <Text
        style={[fonts.font22extrabold, {marginTop: 35, textAlign: 'center'}]}>
        {'Упс, в вашей корзине\n ничего нет'}
      </Text>
      <Text
        style={[
          fonts.font16semibold,
          {marginTop: 12, color: GRAY, textAlign: 'center'},
        ]}>
        {'Перейдите в раздел ресторанов,\n чтобы сделать заказ'}
      </Text>
      <ButtonRed
        style={{marginTop: '20%'}}
        label={'Выбрать ресторан'}
        onPress={onPress}
      />
    </View>
  );
};

export default EmptyBag;
