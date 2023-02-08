import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { inject, observer } from "mobx-react";
import { AsyncStorage } from "react-native";
import InputSearch from "../../components/InputSearch";
import HorizontalTabMenu from "../../components/HorizontalTabMenu";
import RestaurantTab from "./components/RestaurantTab";
import SearchResult from "./components/SearchResult";
import ButtonBack from "../../components/ButtonBack";
import AuthStore from '../../stores/AuthStore';

import { GRAY, LIGHT_GRAY } from "../../assets/colors";
import {
  icon20,
  icon24,
  itemsSortShopsDefault,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  wrappers,
} from "../../utils/style";
import { fonts } from "../../constants/styles";
import {
  DELIVERY,
  RESTAURANT,
  RESTAURANTS,
  SELECTCITY,
} from "../../utils/navigation";
import { IAuthStore } from "../../stores/AuthStore";
import { IDataStore } from "../../stores/DataStore";
import { Shop } from "../../api/types";

const RestaurantsScreen: React.FC<{
  navigation: any;
  route: any;
  authStore: IAuthStore;
  dataStore: IDataStore;
}> = inject(
  "authStore",
  "dataStore"
)(
  observer(({ navigation, route, authStore, dataStore }) => {
    let [showResult, setShowResult] = useState("Все");
    let [searchValue, setSearchValue] = useState("");
    let [searchFocus, setSearchFocus] = useState(false);

    const {
      type,
      loading,
      session,
      cartUpated,
      sortedShops,
      currentCity,
      generateSession,
      getListShop,
      viewCart,
      setCurrentShop,
      getListProducts,
      onSortedShops,
    } = dataStore;

    const { setUserName } = AuthStore;

    const reloadData = () => {
      getListShop(searchValue);
    };

    useEffect(() => {
      reloadData();
    }, [searchValue]);

    useEffect(() => {
      console.log("route?.params?.from", type);
    }, [type]);

    useEffect(() => {
      if (!session.sessionId) {
        generateSession();
      }
    }, []);

    useEffect(() => {
      if (cartUpated) {
        viewCart();
      }
    }, [cartUpated]);

    const onPressShopTab = (item: Shop) => {
      setCurrentShop(item);
      getListProducts(item.uuid);
      setTimeout(() => navigation.navigate(RESTAURANT), 150);
    };

    const onSortShops = (type: string) => {
      onSortedShops(type);
    };

 

    const removeAll = async () => {
      await AsyncStorage.clear();
    };

    return (
      <View>
        <StatusBar />
        <View style={styles.wrapper}>
          {!searchFocus && (
            <View
              style={[
                wrappers.rowStretchedHorizontalWrapper,
                { marginTop: 44 + 9 },
              ]}
            >
              <TouchableOpacity
                style={[wrappers.rowAlignedWrapper]}
                onPress={() =>
                  navigation.navigate(SELECTCITY, { from: RESTAURANTS })
                }
              >
                <Image
                  source={require("../../assets/icons/location-icon.png")}
                  style={icon24}
                />
                <Text style={styles.fontCity}>{currentCity?.name}</Text>
              </TouchableOpacity>
              {route?.params?.from === DELIVERY && (
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/icons/heart-icon.png")}
                    style={icon20}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          <View
            style={[
              wrappers.rowCenteredWrapper,
              { marginTop: searchFocus ? 44 : 19 },
            ]}
          >
            {searchFocus && (
              <ButtonBack
                style={{ marginRight: 8 }}
                onPress={() => setSearchFocus(false)}
              />
            )}
            <InputSearch
              placeholder={'Поиск по всей еде'}
              style={[searchFocus && {width: WINDOW_WIDTH - 80}]}
              fontInput={[searchFocus && {width: WINDOW_WIDTH - 80 - 71}]}
              defaultValue={''}
              onFocus={() => setSearchFocus(true)}
              onChange={value => setSearchValue(value)}
            />

          </View>
          {/* {!searchFocus && searchValue === "" && (
            <HorizontalTabMenu
              style={{ marginTop: 24 }}
              onChange={onSortShops}
              defaultValue={"all"}
              items={itemsSortShopsDefault}
            />
          )} */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{flexGrow:1, marginTop:8}}
            //style={{marginTop: 24, height: WINDOW_HEIGHT - 300 - getBottomSpace()}}
            style={{
              marginTop: 8,
              height: WINDOW_HEIGHT - 250 - getBottomSpace(),
            }} //SE
            // contentContainerStyle={{
            //   paddingBottom: OS_IOS ? 120 + getBottomSpace() : 121,
            // }}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => reloadData()}
              />
            }
          >
            {searchValue === "1" && (
              <Text style={styles.emptySearch}>{"Увы, ничего не найдено"}</Text>
            )}
            {searchValue === "2" && <SearchResult />}
            {searchValue === "3" && (
              <>
                <SearchResult withProducts={true} />
                <SearchResult withProducts={true} />
                <SearchResult withProducts={true} />
              </>
            )}
            <View style={{ height: 16 }} />
            {sortedShops.length ? (
              sortedShops.map((item: Shop) => (
                <RestaurantTab
                  onPress={() => onPressShopTab(item)}
                  item={item}
                />
              ))
            ) : (
              <Text style={styles.emptySearch}>{"Увы, ничего не найдено"}</Text>
            )}
            {!searchFocus && searchValue === "" && (
              <>
                {/*<RestaurantTab*/}
                {/*  onPress={() => navigation.navigate(BOOKTABLE)}*/}
                {/*  type={2}*/}
                {/*/>*/}
                {/*<RestaurantTab*/}
                {/*  onPress={() => navigation.navigate(RESTAURANT)}*/}
                {/*  type={3}*/}
                {/*/>*/}
              </>
            )}

            {/*{[1, 2, 3].map(i => {*/}
            {/*  return <RestaurantTab onPress={() => navigation.navigate(RESTAURANT)} type={i} />})*/}
            {/*}*/}

            <View style={{ height: 100 }} />
          </ScrollView>
        </View>
      </View>
    );
  })
);

const styles = StyleSheet.create({
  emptySearch: {
    ...fonts.font16bold,
    color: GRAY,
    textAlign: "center",
    marginTop: 48,
  },
  fontCity: {
    ...fonts.font16bold,
    marginLeft: 10,
  },
  wrapper: {
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 14,
  },
});

export default RestaurantsScreen;
