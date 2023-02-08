import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';

import ButtonRed from '../../../components/ButtonRed';
import InputWithLabel from '../../../components/InputWithLabel';

import {fonts} from '../../../constants/styles';
import {wrappers} from '../../../utils/style';
import {WHITE} from '../../../assets/colors';

const EnterPromoCodeModal: React.FC<{
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  onEnterCode: () => void;
}> = ({setShowModal, showModal, onEnterCode}) => {
  let [code, setCode] = useState('');
  const onPressClearLocal = () => {
    onEnterCode && onEnterCode(code);
    setShowModal(false);
  };

  return (
    <Modal
      style={styles.modal}
      backdropOpacity={0.8}
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}>
      <View style={styles.wrapper}>
        <Text style={fonts.font20bold}>{'Промокод'}</Text>
        <View style={[wrappers.centeredWrapper, {marginTop: 16}]}>
          <InputWithLabel defaultValue={''} onChange={setCode} />
          <ButtonRed
            label={'Применить'}
            style={{width: 290, marginTop: 8}}
            onPress={() => onPressClearLocal()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 166,
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

export default EnterPromoCodeModal;
