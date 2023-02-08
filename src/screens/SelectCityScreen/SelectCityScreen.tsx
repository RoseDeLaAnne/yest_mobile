import React, {useEffect} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {inject, observer} from 'mobx-react';

import StatusBar from '../../components/StatusBar';

import {HOME} from '../../utils/navigation';
import {fonts} from '../../constants/styles';
import {IAuthStore} from '../../stores/AuthStore';
import {IDataStore} from '../../stores/DataStore';
import {WINDOW_HEIGHT} from '../../utils/style';
import {City} from '../../api/types';
import {log} from '../../utils/handlers';

const SelectCityScreen: React.FC<{
  navigation: any;
  authStore: IAuthStore;
  dataStore: IDataStore;
  route: object;
}> = inject(
  'authStore',
  'dataStore',
)(
  observer(({navigation, dataStore, route}) => {
    const {cities, loading, setCurrentCity, getListCity} = dataStore;

    useEffect(() => {
      getListCity();
    }, [getListCity]);

    const onChangeCity = (city: City) => {
      let routeGoBack = HOME;
      if (route?.params?.from) {
        routeGoBack = route?.params.from;
      }
      setCurrentCity(city);
      setTimeout(() => navigation.navigate(routeGoBack), 200);
    };

    return (
      <View>
        <StatusBar />
        <View style={{marginTop: 40, paddingHorizontal: 14}}>
          <Text style={fonts.font28bold}>{'Выберите город'}</Text>
          <ScrollView
            style={{height: WINDOW_HEIGHT - 170}}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={() => {}} />
            }>
            {cities &&
              cities.length > 0 &&
              cities.map((item: City) => (
                <TouchableOpacity
                  style={{marginTop: 24, marginLeft: 2}}
                  onPress={() => onChangeCity(item)}>
                  <Text style={fonts.font16bold}>{item?.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }),
);

export default SelectCityScreen;
