import React, { useState } from "react";
import {
  Dimensions,
  I18nManager,
  Image,
  Platform, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StatusBar from '../../components/StatusBar';
import { BLACK, LIGHT_GRAY, WHITE, YELLOW } from "../../assets/colors";
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import {icon20, WINDOW_WIDTH, wrappers} from '../../utils/style';
import {fonts} from '../../constants/styles';
import ButtonRed from "../../components/ButtonRed";
import ButtonBack from "../../components/ButtonBack";

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const imageRest1 = require('../../assets/icons/restaraunt-image.png');
const imageRest2 = require('../../assets/icons/restaraunt-image-2.png');
const imageRest3 = require('../../assets/icons/restaraunt-empty-image.png');
const imageRest4 = require('../../assets/icons/restaraunt-empty-2-image.png');

const renderNavBar = (navigation, showLabel) => (
  <View style={styles.navContainer}>
    {/*<View style={styles.statusBar} />*/}
    <View style={styles.navBar}>
      {/*<TouchableOpacity style={{}} onPress={() => {}}>*/}
      {/*  <Text style={{color: 'white'}}>About</Text>*/}
      {/*</TouchableOpacity>*/}
      <ButtonBack
        onPress={() => navigation.goBack()}
      />
      {showLabel &&
        <Text>{'История бронирования'}</Text>
      }
      {/*<TouchableOpacity style={{}} onPress={() => {}}>*/}
      {/*  <Text style={{color: 'white'}}>Me</Text>*/}
      {/*</TouchableOpacity>*/}
    </View>
  </View>
);

const renderContent = () => {
  return (
    <View style={{backgroundColor: LIGHT_GRAY}}>
      {Array.from(Array(5).keys()).map(i => (
        <View key={i} style={styles.bookingWrapper}>
          <Image
            source={require('../../assets/images/restaraunt-image.png')}
            style={styles.imageContent}
          />
          <View style={[wrappers.rowStretchedWrapper, {marginTop: 11, width: WINDOW_WIDTH - 32, paddingHorizontal: 11}]}>
            <View>
              <Text style={[fonts.font20bold]}>
                {'Грибоедов'}
              </Text>
              <View style={[wrappers.rowStretchedWrapper, {marginTop: 7}]}>
                <Image
                  source={require('../../assets/icons/hourglass-icon.png')}
                  style={[icon20, {marginLeft: -5}]}
                />
                <Text
                  style={[fonts.font12bold, {marginLeft: 1, color: YELLOW}]}>
                  {'Ожидает подтверждения'}
                </Text>
              </View>
            </View>
            <ButtonRed
              label={'Отменить'}
              style={{width: WINDOW_WIDTH * 0.32, backgroundColor: LIGHT_GRAY}}
              styleLabel={{color: BLACK}}
              onPress={() => {}}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const title = () => {
  return (
    <View style={{}}>
      {/*<Text style={{color: 'white', fontSize: 25}}>{'История бронирования'}</Text>*/}
    </View>
  );
};

const BookingHistoryScreen = ({navigation, route}) => {
  let [showLabel, setShowLabel] = useState(false);

  return (
    <>
      <StatusBar />
      <View style={wrappers.rowAlignedWrapper}>
        <ButtonBack
          style={{marginLeft: 16}}
          onPress={() => navigation.goBack()}
        />
        {showLabel &&
          <Text style={[fonts.font16bold, {marginLeft: 16}]}>{'История бронирования'}</Text>
        }
      </View>
      <ScrollView
        style={{marginTop: 16}}
        showsVerticalScrollIndicator={false}
        //stickyHeaderIndices={[0]}
        onScroll={(event) => setShowLabel(event.nativeEvent.contentOffset.y > 0)}
      >
        {true &&
          <Text style={[fonts.font28bold, {marginLeft: 16, marginTop: 8, marginBottom: 8}]}>
            {'История\nбронирования'}
          </Text>
        }
        {renderContent()}
        <View style={{height: 50}} />
      </ScrollView>
      {/*<ReactNativeParallaxHeader*/}
      {/*  headerMinHeight={HEADER_HEIGHT}*/}
      {/*  headerMaxHeight={70}*/}
      {/*  extraScrollHeight={0}*/}
      {/*  navbarColor={LIGHT_GRAY}*/}
      {/*  titleStyle={styles.titleStyle}*/}
      {/*  alwaysShowTitle={false}*/}
      {/*  alwaysShowNavBar={false}*/}
      {/*  title={title()}*/}
      {/*  backgroundImage={require('../../assets/images/booking-history.png')}*/}
      {/*  backgroundImageScale={1}*/}
      {/*  //renderNavBar={() => renderNavBar(navigation, showLabel)}*/}
      {/*  renderContent={renderContent}*/}
      {/*  containerStyle={styles.container}*/}
      {/*  contentContainerStyle={styles.contentContainer}*/}
      {/*  innerContainerStyle={styles.container}*/}
      {/*  //scrollEventThrottle={16}*/}
      {/*  scrollViewProps={{*/}
      {/*    //onScrollBeginDrag: () => setShowLabel(false),*/}
      {/*    onScrollEndDrag: () => setShowLabel(true),*/}
      {/*    onScrollToTop: () => setShowLabel(false),*/}
      {/*    //onScroll: (event) => console.debug(event.nativeEvent.contentOffset.y)*/}
      {/*    onScroll: (event) => setShowLabel(event.nativeEvent.contentOffset.y > 0)*/}
      {/*  }}*/}
      {/*/>*/}
    </>
  );
};

const styles = StyleSheet.create({
  imageContent: {
    width: WINDOW_WIDTH - 32,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: 141,
  },
  bookingWrapper: {
    width: WINDOW_WIDTH - 32,
    height: 211,
    backgroundColor: WHITE,
    borderRadius: 14,
    marginTop: 16,
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
    backgroundColor: LIGHT_GRAY,
    width: '100%',
    marginLeft: 0,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: LIGHT_GRAY,

  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

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

export default BookingHistoryScreen;
