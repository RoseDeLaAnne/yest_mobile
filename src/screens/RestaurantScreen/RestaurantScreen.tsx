import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {inject, observer} from 'mobx-react';

import ButtonBack from '../../components/ButtonBack';
import ButtonCircle from '../../components/ButtonCircle';
import HorizontalTabMenu from '../../components/HorizontalTabMenu';
import RecommendedDishes from './components/RecommendedDishes';
import ButtonBag from '../../components/ButtonBag';
import ProductModal from '../../components/ProductModal';

import {fonts} from '../../constants/styles';
import {BLACK, LIGHT_GRAY, WHITE} from '../../assets/colors';

import {BAG, RESTAURANT} from '../../utils/navigation';
import {IAuthStore} from '../../stores/AuthStore';
import {IDataStore} from '../../stores/DataStore';

import {Product} from '../../api/types';
import {
  emptyImageRestaurant,
  getImage,
  icon20,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  wrappers,
} from '../../utils/style';
import {urlShops} from '../../utils/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HEADER_HEIGHT = 142;

const GetHeaderBar = ({
  navigation,
  showBar,
  setShowBar,
  animatedValue,
  shop,
  favoriteShops,
  updateFavoriteShops,
}) => {
  const insets = useSafeAreaInsets();

  // const headerHeight = animatedValue.interpolate({
  //   inputRange: [0, HEADER_HEIGHT + insets.top],
  //   outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
  //   extrapolate: 'clamp',
  // });

  const Max_Header_Height = 200;
  const Min_Header_Height = 70;
  const Scroll_Distance = Max_Header_Height - Min_Header_Height;

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Max_Header_Height, Min_Header_Height],
    extrapolate: 'clamp',
  });

  const getImage = (
    uri: string,
    emptySource: object = emptyImageRestaurant,
  ) => {
    if (uri && uri !== '') {
      return {uri: urlShops + uri};
    } else {
      return emptySource;
    }
  };

  if (showBar) {
    return (
      <ImageBackground
      
        source={getImage(shop?.logo)}
        //resizeMode="contain"
        //resizeMode="repeat"
        resizeMode={shop?.logo ? 'contain' : 'cover'}
        style={styles.imageBackground}>
        <View style={wrappers.rowStretchedHorizontalWrapper}>
          <ButtonBack
            onPress={() => navigation.goBack()}
            style={{backgroundColor: 'rgba(255, 255, 255, 0.6)'}}
          />
          <View style={wrappers.rowCenteredWrapper}>
            {/* <ButtonCircle*/}
            {/*  iconType={'search'}*/}
            {/*  onPress={() => setShowBar(!showBar)}*/}
            {/*/>*/}
            {/* <ButtonCircle
              iconType={
                favoriteShops.includes(shop.uuid) ? 'redHeart' : 'heart'
              }
              style={{marginLeft: 14}}
              onPress={() => updateFavoriteShops(shop)}
            /> */}
          </View>
        </View>
        <Text style={styles.fontHeader}>
          {shop?.name ? shop.name : shop?.transliteration}
        </Text>
        <View
          style={[wrappers.rowAlignedWrapper, {marginTop: 12, marginLeft: 7}]}>
          {/* <Image
            source={require('../../assets/icons/star-icon.png')}
            style={icon20}
          /> */}
          <Text style={styles.fontDescription}>{`${4.7} Рекомендуем`}</Text>
          {/* <Image
            source={require('../../assets/icons/delivery-icon.png')}
            style={icon20}
          /> */}
          <Text style={styles.fontDescription}>{'25-35 мин'}</Text>
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <View style={styles.barWrapper}>
        <View style={wrappers.rowStretchedWrapper}>
          <View style={wrappers.rowCenteredWrapper}>
            <ButtonBack
              onPress={() => navigation.goBack()}
              style={{backgroundColor: 'rgba(255, 255, 255, 0.6)'}}
            />
            <Text style={[fonts.font16bold, {marginLeft: 16}]}>
              {shop?.name ? shop?.name : shop?.transition}
            </Text>
          </View>
          <View style={wrappers.rowCenteredWrapper}>
            {/*<ButtonCircle*/}
            {/*  iconType={'search'}*/}
            {/*  onPress={() => setShowBar(!showBar)}*/}
            {/*/>*/}

          </View>
        </View>
      </View>
    );
  }
};

const RestaurantScreen: React.FC<{
  navigation: any;
  authStore: IAuthStore;
  dataStore: IDataStore;
}> = inject(
  'authStore',
  'dataStore',
)(
  observer(({navigation, authStore, dataStore}) => {
    const [showBag, setShowBag] = useState(null);
    let [showProductDetails, setShowProductDetails] = useState(false);
    let [showBar, setShowBar] = useState(true);

    // let [flatListOffsetY, setFlatListOffsetY] = useState(0);

    const {
      shop,
      cart,
      product,
      sortedProducts,
      favoriteShops,
      loading,
      pushToCart,
      getListProducts,
      setCurrentProduct,
      updateFavoriteShops,
      onSortedProducts,
    } = dataStore;

    const offset = useRef(new Animated.Value(0)).current;

    const reloadData = () => {
      getListProducts(shop.uuid);
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
          setShowBag(cart[shopIndex]);
        }
      }else{
        setShowBag(null);
      }
    };

    const onPressDish = (product: any) => {
      if(product == null){
        return;
      }

      setCurrentProduct(product);
      setShowProductDetails(true);
    };

    const onSortProducts = (type: string) => {
      onSortedProducts(type);
    };

    const renderItem = (item: {item: Product}) => {
      let bag = null;
      if (showBag != null) {
        const itemIndex = showBag?.cart.findIndex(
          i => i.productInfo.uuid === item?.item.uuid,
        );
        if (itemIndex > -1) {
          bag = showBag?.cart[itemIndex];
        }
      }
      return (
        <RecommendedDishes
          isAdded={true}
          product={item?.item}
          item={item?.item}
          bag={bag}
          onPress={() => onPressDish(item?.item)}
          onPressAdd={number => {
            pushToCart(item.item.uuid, number);
            console.log('number', cart, item.item);
          }}
        />
      );
    };

    return (
      <View>
        
        <GetHeaderBar
          animatedValue={offset}
          navigation={navigation}
          setShowBar={setShowBar}
          showBar={showBar}
          shop={shop}
          favoriteShops={favoriteShops}
          updateFavoriteShops={updateFavoriteShops}
        />
        <View style={styles.contentWrapper}>
          <HorizontalTabMenu
            onChange={onSortProducts}
            defaultValue={'all'}
            style={{marginTop: 24}}
          />
          <View style={{height: 10}} />
  
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => reloadData()}
              />
            }
            renderItem={renderItem}
            scrollEventThrottle={16}
            // onScroll={event => {
            //   Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
            //     useNativeDriver: false,
            //   });
            //   setShowBar(event.nativeEvent.contentOffset.y <= 0);
            // }}
            onScroll={event =>
              setShowBar(event.nativeEvent.contentOffset.y <= 0)
            }
            data={sortedProducts}
            keyExtractor={item => item.uuid}
            numColumns={2}
            // ListHeaderComponent={() => 
            //   <View>
            //     <GetHeaderBar
            //       animatedValue={offset}
            //       navigation={navigation}
            //       setShowBar={setShowBar}
            //       showBar={showBar}
            //       shop={shop}
            //       favoriteShops={favoriteShops}
            //       updateFavoriteShops={updateFavoriteShops}
            //     />
            //     <HorizontalTabMenu
            //       onChange={onSortProducts}
            //       defaultValue={'all'}
            //       style={{marginTop: 24}}
            //     />
            //   </View>
            // }
            // stickyHeaderIndices={[0]}
            style={{
              height:
                WINDOW_HEIGHT -
                325 -
                getBottomSpace() -
                (showBag != null ? 65 : 0) +
                (showBar ? 0 : 130),
            }}
          />
        </View>
        {showBag != null ? (
          <View style={styles.bottomBarWrapper}>
            <ButtonBag
              price={showBag.sum}
              onPress={() => navigation.navigate(BAG, {from: RESTAURANT})}
            />
          </View>
        ) : null}
        {showProductDetails && (
          <ProductModal
            product={product}
            showModal={showProductDetails}
            setShowModal={setShowProductDetails}
          />
        )}
        <View />
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  bottomBarWrapper: {
    backgroundColor: WHITE,
    position: 'absolute',
    height: 98,
    width: WINDOW_WIDTH,
    //marginTop: WINDOW_HEIGHT - 140 - getBottomSpace(),
    marginTop: WINDOW_HEIGHT - 140 - getBottomSpace(),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  fontDishes: {
    ...fonts.font16bold,
    marginTop: 24,
    marginLeft: 2,
  },
  contentWrapper: {
    backgroundColor: LIGHT_GRAY,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: -28,
    paddingHorizontal: 14,
  },
  fontDescription: {
    ...fonts.font12bold,
    //color: WHITE,
    color: BLACK,
    marginLeft: 7,
    marginRight: 17,
  },
  fontHeader: {
    ...fonts.font28bold,
    //color: WHITE,
    color: BLACK,
    marginTop: 49,
    marginLeft: 7,
  },
  barWrapper: {
    width: WINDOW_WIDTH,
    height: 115,
    paddingHorizontal: 14,
    paddingTop: 44,
  },
  imageBackground: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.288177,
    paddingHorizontal: 14,
    paddingTop: 44,
    backgroundColor: WHITE,
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

export default RestaurantScreen;
