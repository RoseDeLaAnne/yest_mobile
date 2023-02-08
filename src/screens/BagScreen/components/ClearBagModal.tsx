import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';

import ButtonRed from '../../../components/ButtonRed';

import {wrappers} from '../../../utils/style';
import {WHITE} from '../../../assets/colors';
import {fonts} from '../../../constants/styles';

const ClearBagModal: React.FC<{
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  onPressClear: () => void;
}> = ({setShowModal, showModal, onPressClear}) => {
  const onPressClearLocal = () => {
    onPressClear && onPressClear();
    setShowModal(false);
  };

  return (
    <Modal
      style={styles.modal}
      backdropOpacity={0.8}
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}>
      <View style={styles.wrapper}>
        <Text style={fonts.font20bold}>{'Очистить корзину?'}</Text>
        <View style={[wrappers.rowStretchedHorizontalWrapper, {marginTop: 16}]}>
          <ButtonRed
            label={'Отмена'}
            type={'gray'}
            style={{width: 138}}
            onPress={() => setShowModal(false)}
          />
          <ButtonRed
            label={'Очистить'}
            style={{width: 138}}
            onPress={() => onPressClearLocal()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 110,
    width: 314,
    backgroundColor: WHITE,
    borderRadius: 14,
    marginLeft: 0,
    padding: 12,
  },
  modal: {
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClearBagModal;
