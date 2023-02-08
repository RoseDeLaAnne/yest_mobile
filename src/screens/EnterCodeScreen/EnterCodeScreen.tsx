import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { inject, observer } from "mobx-react";
import OtpInputs from "rn-custom-otp";

import ButtonBack from "../../components/ButtonBack";
import ButtonRed from "../../components/ButtonRed";

import {
  BLACK,
  GRAY,
  LIGHT_GRAY,
  LIGHT_GRAY_2,
  WHITE,
} from "../../assets/colors";
import { fonts } from "../../constants/styles";
import { formatPhoneNumber, wrappers } from "../../utils/style";
import { ENTERNAME, PHONE, PROFILE } from "../../utils/navigation";
import { IAuthStore } from "../../stores/AuthStore";
import { logError } from "../../utils/handlers";

let seconds1 = 60;

import { AsyncStorage } from "react-native";

import axios from 'axios';

const EnterCodeScreen: React.FC<{
  navigation: any;
  authStore?: IAuthStore;
}> = inject("authStore")(
  observer(({ navigation, authStore, route }) => {
    let [seconds, setSeconds] = useState(60);
    const { user, validCode, registration, auth } = authStore;

    logError("EnterCodeScreen ", route?.params?.from);

    const getNumber = (number: number) => {
      if (number < 10) {
        return `0${number}`;
      } else {
        return number;
      }
    };

    useEffect(() => {
      const timer = setInterval(
        () => setSeconds(seconds1 - 1 > 0 ? seconds1-- : 0),
        1000
      );
      return () => clearInterval(timer);
    }, []);

    const changeCode = async (number: number) => {
      if (number.toString().length > 3) {
        validCode(() => navigation.navigate(PROFILE), number, 2);

        // console.log(response.data)
        // if (route?.params?.empty) {
        //   // validCode(Number(number), () => navigation.navigate(PROFILE),route?.params?.phone,route?.params?.name, true);
        //   validCode(Number(number), () => navigation.navigate(PROFILE), route?.params?.phone, 2);
        // } else {
        //   validCode(Number(number), () => navigation.navigate(ENTERNAME), route?.params?.phone);
        // }
      }
    };
    // TODO remove

    return (
      <ScrollView style={styles.wrapper}>
        <ButtonBack onPress={() => navigation.goBack()} />
        <View style={wrappers.centeredWrapper}>
          <Text style={styles.fontProfile}>{"Теперь введите код"}</Text>
          <View style={[wrappers.rowAlignedWrapper, { marginTop: 12 }]}>
            <Text style={[fonts.font16semibold, { color: GRAY }]}>
              {"На номер "}
            </Text>
            <Text style={[fonts.font16semibold, { color: BLACK }]}>
              {`+7 ${route?.params?.phone}`}
            </Text>
          </View>
          <Text style={[fonts.font16semibold, { color: GRAY }]}>
            {"отправлено СМС с кодом"}
          </Text>
        </View>
        <View style={[wrappers.rowCenteredWrapper, { marginTop: -5 }]}>
          <OtpInputs
            numberOfInputs={4} // pass any number as per requirements
            focusedBorderColor={WHITE}
            unFocusedBorderColor={WHITE}
            clearTextOnFocus={true}
            //inputsContainer={{width: 200, marginHorizontal: 70}}
            containerStyles={{ marginLeft: 52 }}
            //errorMessage={"Invalid OTP"} // pass error message if applicable
            inputTextErrorColor={"black"}
            errorMessageTextStyles={{ color: "red" }} // Error message text style
            handleChange={(code) => {
              changeCode(code);
            }}
            keyboardType={"number-pad"}
            secureTextEntry={false}
            inputStyles={{
              ...fonts.font16semibold,
              marginBottom: 10,
            }}
            inputContainerStyles={{
              borderRadius: 10,
              borderWidth: 0,
              backgroundColor: LIGHT_GRAY_2,
              height: 48,
              width: 48,
              marginLeft: -24,
              ...wrappers.centeredWrapper,
            }}
          />
        </View>
        <View style={[wrappers.centeredWrapper, { marginTop: -5 }]}>
          <Text style={[fonts.font12semibold, { color: GRAY }]}>
            {"Если код не придет, можно получить"}
          </Text>
          <Text style={[fonts.font12semibold, { color: GRAY }]}>
            {`новый через ${getNumber(seconds)} сек`}
          </Text>
        </View>
        <ButtonRed
          label={"Получить новый код"}
          disabled={seconds > 0}
          style={{ marginTop: 135 }}
          //onPress={() => navigation.navigate(ENTERNAME)}
          // onPress={() => handleOnPressButtonRed()}
          onPress={async () =>
            route?.params?.from !== "phone"
              ? registration(() => {
                  seconds1 = 60;
                }, await AsyncStorage.getItem('phone'))
              : auth(() => {
                  seconds1 = 60;
                }, await AsyncStorage.getItem('phone'))
          }
        />
      </ScrollView>
    );
  })
);

const styles = StyleSheet.create({
  fontProfile: {
    ...fonts.font22extrabold,
    marginTop: 24,
  },
  wrapper: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 14,
    paddingTop: 44,
  },
});

export default EnterCodeScreen;
