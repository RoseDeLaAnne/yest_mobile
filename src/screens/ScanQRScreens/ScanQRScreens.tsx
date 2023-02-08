
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevices,
} from 'react-native-vision-camera';
import {IAuthStore} from '../../stores/AuthStore';
import {IDataStore} from '../../stores/DataStore';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {BAG, RESTAURANT, RESTAURANTS} from '../../utils/navigation';
import {inject, observer} from 'mobx-react';


let debounce = null 
const ScanQrScreens: React.FC<{
  navigation: any;
  route: any;
  authStore: IAuthStore;
  dataStore: IDataStore;
}> = inject(
  'authStore',
  'dataStore',
)(
  observer(({navigation, route, authStore, dataStore}) => {
    const isJSON = (str) => {
      try {
        JSON.parse(str);
      } catch (e) {
        return false
      }
      return true
    }

    const fakeUrl = 'https://entrega.su/?organizationId=a7898941-95f4-11eb-850a-0050569dbef0&branchId=514236af-95f5-11eb-850a-0050569dbef0&tableId=9c544bde-6265-4d67-9ef4-52deb9ff332f&streetId=7800000000014670000000000&houseNumber=172%20%D0%BB%D0%B8%D1%82%20%D0%9C'
    // get,organizationId, branchId, tableId, streetId, houseNumber from url
    const getParamsFromUrl = (url) => {
      if (!isJSON(url)) {
        const params = url.split('?')[1].split('&');
        const organizationId = params[0].split('=')[1];
        const branchId = params[1].split('=')[1];
        const tableId = params[2].split('=')[1];
        const streetId = params[3].split('=')[1];
        const houseNumber = params[4].split('=')[1];
        return {organizationId, branchId, tableId, streetId, houseNumber};
      } else if (isJSON(url)) {
        const organizationId = url.organizationId;
        const branchId = '514236af-95f5-11eb-850a-0050569dbef0'
        const tableId = url.tableId;
        const streetId = url.streetId;
        const houseNumber = url.houseNumber;
        return {organizationId, branchId, tableId, streetId, houseNumber};
      }
    };
    // console.log('branchId, tableId, streetId, houseNumber', branchId, tableId, streetId, houseNumber);



    const camera = useRef<Camera>(null);
    const [loader, setLoader] = useState(true);
    const devices = useCameraDevices();
    const [frameProcessor, barcodes] = useScanBarcodes(
      [BarcodeFormat.ALL_FORMATS],
      {checkInverted: true},
    );
    const {loading,  getShop, getListProducts,setTable,setStreetId,setHouseNumber, setOrganizationId} = dataStore;
    
    useEffect(() => {
      if (devices.back) {
        setLoader(false);
      }
    }, [devices]);

    useEffect(() => {
      if (barcodes[0]?.rawValue) {
        setLoader(true);
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          processResult(barcodes[0]);
        }, 300);
      }
    }, [barcodes, processResult]);

    const processResult = useCallback(
      value => {
        const res= value.rawValue
        console.log('-----', res);
        const {organizationId,branchId, tableId, streetId, houseNumber} = getParamsFromUrl(res);
        setHouseNumber(houseNumber);
        setStreetId(streetId)
        setTable(tableId);
        setOrganizationId(organizationId);
        getShop(organizationId);
        getListProducts(organizationId);
        setTimeout(() => {
          navigation.navigate(RESTAURANT);
          setLoader(false);
        }, 1000);
      },
      [getListProducts, getShop, navigation],
    );

    return (
      <View style={{flex: 1}}>
        {loader ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator size="large" />
          </View>
        ) : devices.back ? (
          <Camera
            ref={camera}
            style={[styles.camera]}
            device={devices?.back}
            isActive={!loader}
            frameProcessor={frameProcessor}
            frameProcessorFps={50}
            captureAudio={false}
          />
        ) : null}
      </View>
    );
  }),
);
const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default ScanQrScreens;
