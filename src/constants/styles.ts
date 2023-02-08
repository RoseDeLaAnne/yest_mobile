import {StyleSheet} from 'react-native';

import {BLACK} from '../assets/colors';
import {getFontFamily} from '../utils/style';

export const fonts = StyleSheet.create({
  font: {
    ...getFontFamily(400),
    color: BLACK,
  },
  fontBold: {
    ...getFontFamily(700),
    color: BLACK,
  },
  font10bold: {
    ...getFontFamily(700),
    fontSize: 10,
    lineHeight: 13,
    color: BLACK,
  },
  font12: {
    ...getFontFamily(400),
    fontSize: 12,
    lineHeight: 16,
    color: BLACK,
  },
  font12semibold: {
    ...getFontFamily(600),
    fontSize: 12,
    lineHeight: 16,
    color: BLACK,
  },
  font12bold: {
    ...getFontFamily(700),
    fontSize: 12,
    lineHeight: 16,
    color: BLACK,
  },
  font14: {
    ...getFontFamily(400),
    fontSize: 14,
    lineHeight: 20,
    color: BLACK,
  },
  font14bold: {
    ...getFontFamily(700),
    fontSize: 14,
    lineHeight: 20,
    color: BLACK,
  },
  font16: {
    ...getFontFamily(400),
    fontSize: 16,
    lineHeight: 22,
    color: BLACK,
  },
  font16semibold: {
    ...getFontFamily(600),
    fontSize: 16,
    lineHeight: 22,
    color: BLACK,
  },
  font16bold: {
    ...getFontFamily(700),
    fontSize: 16,
    lineHeight: 22,
    color: BLACK,
  },
  font18: {
    ...getFontFamily(400),
    fontSize: 18,
    lineHeight: 24,
    color: BLACK,
  },
  font18bold: {
    ...getFontFamily(700),
    fontSize: 18,
    lineHeight: 24,
    color: BLACK,
  },
  font20: {
    ...getFontFamily(400),
    fontSize: 20,
    lineHeight: 24,
    color: BLACK,
  },
  font20bold: {
    ...getFontFamily(700),
    fontSize: 20,
    lineHeight: 22,
    color: BLACK,
  },
  font22: {
    ...getFontFamily(400),
    fontSize: 20,
    lineHeight: 24,
    color: BLACK,
  },
  font22extrabold: {
    ...getFontFamily(800),
    fontSize: 22,
    lineHeight: 22,
    color: BLACK,
  },
  font22bold: {
    ...getFontFamily(700),
    fontSize: 22,
    lineHeight: 22,
    color: BLACK,
  },
  font24: {
    ...getFontFamily(400),
    fontSize: 24,
    lineHeight: 26,
    color: BLACK,
  },
  font24bold: {
    ...getFontFamily(700),
    fontSize: 24,
    lineHeight: 26,
    color: BLACK,
  },
  font28bold: {
    ...getFontFamily(800),
    fontSize: 28,
    lineHeight: 30,
    color: BLACK,
  },
});
