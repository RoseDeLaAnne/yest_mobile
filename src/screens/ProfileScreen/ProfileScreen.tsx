import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LIGHT_GRAY } from "../../assets/colors";
import { fonts } from "../../constants/styles";
import AuthStore from "../../stores/AuthStore";

import { AsyncStorage } from "react-native";
import { HOME, MYORDERS, REGISTRATION } from "../../utils/navigation";

import DataStore from '../../stores/DataStore';

import axios from "axios"

const heightScreen = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");
  const { removeAll, names } = AuthStore;

  const {session, generateSession,} = DataStore;

  const removeAllAsyncStorage = async () => {
    console.log("Clearing async storage.");
    try {
      removeAll();

      // navigate andd clean navigation history
      navigation.navigate(HOME);
      navigation.reset({
        index: 0,
        routes: [{ name: HOME }],
      });
      
      
    } catch (e) {
    }
    console.log("Done.");
  };

  const getPhone = async () => {
    try {
      const value = await AsyncStorage.getItem("phone");
      if (value !== null) {
        // We have data!!
        setPhone(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  React.useEffect(() => {
    // getPhone();
  }, []);

  // const getName = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("name");
  //     if (value !== null) {
  //       // We have data!!
  //       setName(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
  const getName = async () => {
    const body = {
      sessionId: session.sessionId
    }

    const response = await axios.post(`https://marketa.su/api/user-data`, body)

    setName(response.data.data.name)
  }

  React.useEffect(() => {
    getName();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={[fonts.font28bold, { marginTop: 24, marginBottom: 24 }]}>
        {name}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(MYORDERS, { phone: phone })}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Image
          source={require("../../assets/icons/menucard.png")}
          style={{ width: 14, height: 20, marginRight: 13 }}
        />
        <Text style={fonts.font16bold}>Мои заказы</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={removeAllAsyncStorage}
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#E4E4E4",
          padding: 13,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          marginTop: heightScreen * 0.2,
        }}
      >
        <Text style={fonts.font16bold}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 14,
    paddingTop: 44,
  },
});

export default ProfileScreen;
