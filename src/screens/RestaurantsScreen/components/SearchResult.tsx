import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import RecommendedProduct from '../../../components/RecommendedProduct';

import {WINDOW_WIDTH} from '../../../utils/style';
import {WHITE} from '../../../assets/colors';
import {fonts} from '../../../constants/styles';

const SearchResult = ({withProducts = false}) => {
  return (
    <>
      <TouchableOpacity style={styles.wrapper}>
        <Image
          source={require('../../../assets/images/burger-king.png')}
          style={styles.image}
        />
        <Text style={styles.font}>{'Burger King'}</Text>
      </TouchableOpacity>
      {withProducts && (
        <>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{height: 242, marginTop: 12}}>
            <RecommendedProduct />
            <RecommendedProduct />
            <RecommendedProduct />
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  font: {
    marginLeft: 13,
    ...fonts.font16bold,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 7,
  },
  wrapper: {
    marginTop: 16,
    width: WINDOW_WIDTH - 32,
    backgroundColor: WHITE,
    height: 70,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default SearchResult;
