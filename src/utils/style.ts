import {Dimensions, Platform, StyleSheet} from 'react-native';

const Window = Dimensions.get('window');

export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Window;

export const OS_IOS = Platform.OS === 'ios';

export const getFontFamily = (
  weight?:
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 'light'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'regular'
    | 'extrabold',
): {fontFamily: string} => {
  const platform = Platform.OS;
  if (weight === 300 || weight === 'light') {
    return platform === 'ios'
      ? {fontFamily: 'Mulish-Light'}
      : {fontFamily: 'Mulish-Light'};
  }
  if (weight === 500 || weight === 'medium') {
    return platform === 'ios'
      ? {fontFamily: 'Mulish-Medium'}
      : {fontFamily: 'Mulish-Medium'};
  }
  if (weight === 600 || weight === 'semibold') {
    return platform === 'ios'
      ? {fontFamily: 'Mulish-SemiBold'}
      : {fontFamily: 'Mulish-SemiBold'};
  }
  if (weight === 700 || weight === 'bold') {
    return platform === 'ios'
      ? {fontFamily: 'Mulish-Bold'}
      : {fontFamily: 'Mulish-Bold'};
  }
  if (weight === 800 || weight === 'extrabold') {
    return platform === 'ios'
      ? {fontFamily: 'Mulish-ExtraBold'}
      : {fontFamily: 'Mulish-ExtraBold'};
  }
  return platform === 'ios'
    ? {fontFamily: 'Mulish-Regular'}
    : {fontFamily: 'Mulish-Regular'};
};

export const dateFormat = 'DD/MM/YY';

export const hitSlop1010 = {
  top: 10,
  left: 10,
  bottom: 10,
  right: 10,
};

export const hitSlop1020 = {
  top: 10,
  left: 20,
  bottom: 10,
  right: 20,
};

export const hitSlop2020 = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20,
};

export const hitSlop3030 = {
  top: 30,
  left: 30,
  bottom: 30,
  right: 30,
};

export const iconSmall = {
  height: 20,
  width: 20,
};

export const icon20 = {
  height: 20,
  width: 20,
};

export const icon24 = {
  height: 24,
  width: 24,
};

export const icon28 = {
  height: 28,
  width: 28,
};

export const icon30 = {
  height: 30,
  width: 30,
};

export const icon = {
  height: 32,
  width: 32,
};

export const iconBig = {
  height: 36,
  width: 36,
};

export const icon40 = {
  height: 40,
  width: 40,
};

export const wrappers = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  rowAlignedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  allSpaceWrapper: {
    justifyContent: 'space-between',
  },
  rowCenteredWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowStretchedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowStretchedHorizontalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

// block scrolling if display is long
export const enabledScrollView = (): boolean => {
  return WINDOW_WIDTH / WINDOW_HEIGHT > 0.45;
};

export const regexPhone =
  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

export const emptyImageRestaurant = require('../assets/images/restaraunt-empty-image.png');

export const emptyImageProduct = require('../assets/images/product-empty-image.png');

export const getImage = (
  uri: string,
  emptySource: object = emptyImageRestaurant,
) => {
  if (uri && uri !== '') {
    return {uri: uri};
  } else {
    return emptySource;
  }
};

export const formatPhoneNumber = (phoneNumberString: number) => {
  let cleaned = ('' + phoneNumberString.toString()).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4];
  }
  return null;
};

export const itemsSortShopsDefault = [
  {
    name: 'Все',
    type: 'all',
  },
  {
    name: 'По названию',
    type: 'name',
  },
];
