import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  emptyImageProduct,
  icon24,
  icon30,
  OS_IOS,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  wrappers,
} from '../utils/style';
import {GRAY, LIGHT_GRAY, WHITE} from '../assets/colors';
import CloseButton from './CloseButton';
import {fonts} from '../constants/styles';
import ButtonBag from './ButtonBag';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Product, Specification} from '../api/types';
import {urlProducts} from '../utils/utils';
import {IAuthStore} from '../stores/AuthStore';
import dataStore, {IDataStore} from '../stores/DataStore';
import {inject, observer} from 'mobx-react';

const check = require('../assets/icons/check-icon.png');
const uncheck = require('../assets/icons/uncheck-icon.png');

const ProductModal: React.FC<{
  style?: object;
  styleLabel?: object;
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  product: Product;
  authStore: IAuthStore;
  dataStore: IDataStore;
}> = inject(
  'authStore',
  'dataStore',
)(
  observer(({style, setShowModal, styleLabel, showModal, product}) => {
    const [selectedProp, setSelectedProp] = useState('');
    const {shop, cart, pushToCart} = dataStore;
    const [bag, setBag] = useState(null);
    const [count, setCount] = useState(1);

    const getImage = (uri: string, emptySource: object = emptyImageProduct) => {
      if (uri && uri !== '') {
        return {uri: urlProducts + uri};
      } else {
        return emptySource;
      }
    };
    useEffect(() => {
      handleCart();
    }, [cart]);

    const handleCart = () => {
      if (cart != null) {
        const shopIndex = cart.findIndex(
          c => c.organizationInfo.uuid === shop?.uuid,
        );

        if (shopIndex > -1) {
          console.log('cart', cart != null, shopIndex);
          const itemIndex = cart[shopIndex]?.cart.findIndex(
            i => i.productInfo.uuid === product.uuid,
          );
          console.log('itemIndex', itemIndex);

          if (itemIndex > -1) {
            setBag(cart[shopIndex]?.cart[itemIndex]);

            setCount(cart[shopIndex]?.cart[itemIndex].productCount);
          }
        }
      }
    };

    const [cartUpating, setCartUpdating] = useState(false);
    const update = () => {
      setTimeout(() => {
        setCartUpdating(true);
        setTimeout(() => {
          setCartUpdating(false);
        }, 1000);
      }, 10);
    };

    const addCount = () => {
      setCount(count + 1);
      pushToCart(product.uuid, 1);
      update();
    };
    const reduceCount = () => {
      setCount(count > 1 ? count - 1 : 0);
      pushToCart(product.uuid, -1);
      update();
    };

    return (
      <Modal
        style={styles.modal}
        backdropOpacity={0.8}
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        swipeThreshold={80}
        swipeDirection={'down'}
        onSwipeComplete={() => setShowModal(false)}>
        <ScrollView
          style={{height: WINDOW_HEIGHT - 176}}
          showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={getImage(product?.image)}
            imageStyle={{borderTopRightRadius: 14, borderTopLeftRadius: 14}}
            style={styles.image}>
            <CloseButton
              onPress={() => setShowModal(false)}
              style={{marginTop: 8}}
            />
          </ImageBackground>
          <View style={{paddingHorizontal: 16}}>
            <Text style={styles.name}>{product?.name}</Text>
            <Text style={styles.description}>{product?.description}</Text>
            {product?.weight && (
              <Text style={styles.weight}>{`${product?.weight}г`}</Text>
            )}
          </View>
          {/* {product?.specifications.map((item: Specification) => (
            <>
              <Text style={styles.fontProperty}>{item}</Text>
              {['Сливочный соус', 'Томатный соус'].map(item2 => (
                <TouchableOpacity
                  onPress={() => setSelectedProp(item2)}
                  style={styles.propWrapper}>
                  <View style={wrappers.rowCenteredWrapper}>
                    <Image
                      source={selectedProp === item2 ? check : uncheck}
                      style={icon24}
                    />
                    <Text style={styles.fontPropertyItem}>{item2}</Text>
                  </View>
                  <Text style={fonts.font16bold}>{`${0}₽`}</Text>
                </TouchableOpacity>
              ))}
            </>
          ))} */}
        </ScrollView>
        {true && (
          <View style={styles.bottomBarWrapper}>
            <TouchableOpacity
              style={styles.buttonCount}
              onPress={() => reduceCount()}>
              <Image
                source={require('../assets/icons/minus-icon.png')}
                style={icon30}
              />
            </TouchableOpacity>
            <Text style={[fonts.font16bold, {marginTop: 12}]}>{count}</Text>
            <TouchableOpacity
              style={styles.buttonCount}
              onPress={() => addCount()}>
              <Image
                source={require('../assets/icons/plus-icon.png')}
                style={icon30}
              />
            </TouchableOpacity>
            <ButtonBag
              style={{width: WINDOW_WIDTH / 2}}
              label={'Добавить'}
              price={`${product?.price * count}`}
              onPress={() => {}}
            />
          </View>
        )}
      </Modal>
    );
  }),
);

const styles = StyleSheet.create({
  buttonCount: {
    width: 48,
    height: 48,
    backgroundColor: LIGHT_GRAY,
    ...wrappers.centeredWrapper,
    borderRadius: 10,
  },
  bottomBarWrapper: {
    backgroundColor: WHITE,
    position: 'absolute',
    height: OS_IOS ? 108 : 118,
    width: WINDOW_WIDTH,
    //marginTop: WINDOW_HEIGHT - 140 - getBottomSpace(),
    marginTop: WINDOW_HEIGHT - 235 - getBottomSpace() - (OS_IOS ? 0 : 10),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    ...wrappers.rowStretchedHorizontalWrapper,
  },
  fontPropertyItem: {
    ...fonts.font16semibold,
    marginLeft: 8,
  },
  propWrapper: {
    height: 48,
    width: WINDOW_WIDTH - 32,
    backgroundColor: WHITE,
    ...wrappers.rowStretchedWrapper,
    paddingHorizontal: 13,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 10,
  },
  fontProperty: {
    ...fonts.font16bold,
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 4,
  },
  weight: {
    ...fonts.font16semibold,
    color: GRAY,
    marginTop: 12,
  },
  description: {
    ...fonts.font12semibold,
    color: GRAY,
    marginTop: 8,
  },
  name: {
    ...fonts.font20bold,
    marginTop: 25,
  },
  image: {
    height: WINDOW_WIDTH * 0.6446,
    width: WINDOW_WIDTH,
    alignItems: 'center',
  },
  modal: {
    height: WINDOW_HEIGHT - 156,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    backgroundColor: LIGHT_GRAY,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 156,
    marginBottom: 0,
    justifyContent: 'flex-start',
  },
});

export default ProductModal;
