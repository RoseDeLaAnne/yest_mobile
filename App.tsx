import React, { useEffect } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "mobx-react";

import StartScreen from "./src/screens/StartScreen/StartScreen";
import {
  BAG,
  BOOKINGHISTORY,
  BOOKINGMADE,
  BOOKTABLE,
  DELIVERY,
  ENTERCODE,
  ENTERNAME,
  HOME,
  ORDERPROCESSED,
  PHONE,
  PROFILE,
  REGISTRATION,
  RESTAURANT,
  RESTAURANTS,
  SCANQR,
  START,
  SELECTCITY,
  MYORDERS,
  SMS,
} from "./src/utils/navigation";
import { DARK_GRAY, RED, WHITE } from "./src/assets/colors";
import { fonts } from "./src/constants/styles";
import PhoneScreen from "./src/screens/PhoneScreen/PhoneScreen";
import EnterCodeScreen from "./src/screens/EnterCodeScreen/EnterCodeScreen";
import EnterName from "./src/screens/EnterName/EnterName";
import { enabledScrollView, OS_IOS } from "./src/utils/style";
import ProfileScreen from "./src/screens/ProfileScreen/ProfileScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import ScanQRScreens from "./src/screens/ScanQRScreens/ScanQRScreens";
import BagScreen from "./src/screens/BagScreen/BagScreen";
import OrderProcessedScreen from "./src/screens/OrderProcessedScreen/OrderProcessedScreen";
import RestaurantsScreen from "./src/screens/RestaurantsScreen/RestaurantsScreen";
import RestaurantScreen from "./src/screens/RestaurantScreen/RestaurantScreen";
import DeliveryScreen from "./src/screens/DeliveryScreen/DeliveryScreen";
import BookTableScreen from "./src/screens/BookTableScreen/BookTableScreen";
import BookingMadeScreen from "./src/screens/BookingMadeScreen/BookingMadeScreen";
import BookingHistoryScreen from "./src/screens/BookingHistoryScreen/BookingHistoryScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen/RegistrationScreen";
import authStore from "./src/stores/AuthStore";
import SelectCityScreen from "./src/screens/SelectCityScreen/SelectCityScreen";
import dataStore from "./src/stores/DataStore";
import MyOrdersScreen from "./src/screens/MyOrdersScreen/MyOrdersScreen";
import SmsScreen from "./src/screens/SmsScreen/SmsScreen";
import AuthStore from "./src/stores/AuthStore";
import { AsyncStorage } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const home = require("./src/assets/icons/home-icon.png");
const homeRed = require("./src/assets/icons/home-red-icon.png");
const fork = require("./src/assets/icons/fork-icon.png");
const forkRed = require("./src/assets/icons/fork-red-icon.png");
const bag = require("./src/assets/icons/bag-icon.png");
const bagRed = require("./src/assets/icons/bag-red-icon.png");
const profile = require("./src/assets/icons/profile-icon.png");
const profileRed = require("./src/assets/icons/profile-red-icon.png");

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={HOME}>
      <Stack.Screen
        name={HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCANQR}
        component={ScanQRScreens}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={BAG}
        component={BagScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ORDERPROCESSED}
        component={OrderProcessedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const RestaurantsStack = () => {
  return (
    <Stack.Navigator initialRouteName={RESTAURANTS}>
      <Stack.Screen
        name={RESTAURANTS}
        component={RestaurantsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RESTAURANT}
        component={RestaurantScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={BAG}
        component={BagScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={DELIVERY}
        component={DeliveryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ORDERPROCESSED}
        component={OrderProcessedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={BOOKTABLE}
        component={BookTableScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={BOOKINGMADE}
        component={BookingMadeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={BOOKINGHISTORY}
        component={BookingHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SELECTCITY}
        component={SelectCityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MYORDERS}
        component={MyOrdersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SMS}
        component={SmsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const BagStack = () => {
  return (
    <Stack.Navigator initialRouteName={BAG}>
      <Stack.Screen
        name={BAG}
        component={BagScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  const { getPhone, phones } = authStore;
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");
  useEffect(() => {
    console.log("phones", phones);
    getPhone().then((res) => {
      setPhone(res);
    });
  }, [phones, getPhone, AsyncStorage.getItem("phone")]);

  // detect if value is changed from async storage

  return (
    <Stack.Navigator initialRouteName={REGISTRATION}>
      {!phone ? (
        <>
          <Stack.Screen
            name={PHONE}
            component={PhoneScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={REGISTRATION}
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ENTERCODE}
            component={EnterCodeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ENTERNAME}
            component={EnterName}
            options={{ headerShown: false }}
          />

        </>
      ) : (
        <>
          <Stack.Screen
            name={PROFILE}
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
                    <Stack.Screen
            name={ENTERCODE}
            component={EnterCodeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={ENTERNAME}
            component={EnterName}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={MYORDERS}
            component={MyOrdersScreen}
            options={{ headerShown: false }}
          />
          
        </>
      )}
    </Stack.Navigator>
  );
};

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: WHITE,
      }}
      lazy={false}
      initialRouteName={HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: WHITE,
          //display: hideTabBar(route),
        },
        tabBarIcon: ({ focused }) => {
          if (route.name === HOME) {
            return focused ? (
              <Image style={styles.icon} source={homeRed} />
            ) : (
              <Image style={styles.icon} source={home} />
            );
          } else if (route.name === RESTAURANTS) {
            return focused ? (
              <Image style={styles.icon28} source={forkRed} />
            ) : (
              <Image style={styles.icon28} source={fork} />
            );
          } else if (route.name === BAG) {
            return focused ? (
              <Image style={styles.icon} source={bagRed} />
            ) : (
              <Image style={styles.icon} source={bag} />
            );
          } else if (route.name === PROFILE) {
            return focused ? (
              <Image style={styles.icon} source={profileRed} />
            ) : (
              <Image style={styles.icon} source={profile} />
            );
          }
        },
        tabBarLabel: ({ color }) => {
          if (route.name === HOME) {
            return (
              <Text style={[styles.fontsInTabs, { color: color }]}>
                {"Главная"}
              </Text>
            );
          } else if (route.name === RESTAURANTS) {
            return (
              <Text style={[styles.fontsInTabs, { color: color }]}>
                {"Рестораны"}
              </Text>
            );
          } else if (route.name === BAG) {
            return (
              <Text style={[styles.fontsInTabs, { color: color }]}>
                {"Корзина"}
              </Text>
            );
          } else if (route.name === PROFILE) {
            return (
              <Text style={[styles.fontsInTabs, { color: color }]}>
                {"Профиль"}
              </Text>
            );
          }
        },
        tabBarActiveTintColor: RED,
        tabBarInactiveTintColor: DARK_GRAY,
      })}
    >
      <Tab.Screen name={HOME} component={HomeStack} />
      <Tab.Screen name={RESTAURANTS} component={RestaurantsStack} />
      <Tab.Screen name={BAG} component={BagStack} />
      <Tab.Screen name={PROFILE} component={ProfileStack} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={START}
          screenOptions={({ route }) => ({ headerShown: false })}
        >
          <Stack.Screen name={START} component={StartScreen} />
          <Stack.Screen name={SELECTCITY} component={SelectCityScreen} />
          <Stack.Screen name={HOME} component={TabsNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  const stores = {
    authStore,
    dataStore,
  };

  return (
    <Provider {...stores}>
      <Navigation />
    </Provider>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    marginTop: OS_IOS ? (!enabledScrollView() ? 10 : 5) : 10,
  },
  icon28: {
    height: 28,
    width: 28,
    marginTop: OS_IOS ? (!enabledScrollView() ? 10 : 5) : 10,
  },
  fontsInTabs: {
    ...fonts.font10bold,
    marginBottom: OS_IOS && !enabledScrollView() ? 0 : 5,
  },
});

export default App;
