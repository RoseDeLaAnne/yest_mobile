import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {inject, observer} from 'mobx-react';

import {RED, WHITE} from '../../assets/colors';
import {wrappers} from '../../utils/style';
import {HOME, SELECTCITY} from '../../utils/navigation';
import {IAuthStore} from '../../stores/AuthStore';
import {IDataStore} from '../../stores/DataStore';
import { log } from "../../utils/handlers";

const StartScreen: React.FC<{
  navigation: any;
  authStore: IAuthStore;
  dataStore: IDataStore;
}> = inject(
  'authStore',
  'dataStore',
)(
  observer(({navigation, authStore, dataStore}) => {
    const {currentCity, loadPersist, getListCity} = dataStore;
    let [colorBackground, setColorBackground] = useState(WHITE);

    useEffect(() => {
      setTimeout(() => setColorBackground(RED), 200);
    }, []);

    useEffect(() => {
      if (currentCity && loadPersist) {
        log('currentCity && loadPersist');
        setTimeout(() => navigation.navigate(HOME), 400);
      } else {
        //getListCity();
        log('!!currentCity && loadPersist');
        setTimeout(() => navigation.navigate(SELECTCITY), 400);
      }
    }, [loadPersist]);

    return (
      <View style={[styles.wrapper, {backgroundColor: colorBackground}]}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.image}
        />
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: WHITE,
    ...wrappers.centeredWrapper,
  },
  image: {
    height: 182,
    width: 182,
  },
});

export default StartScreen;
