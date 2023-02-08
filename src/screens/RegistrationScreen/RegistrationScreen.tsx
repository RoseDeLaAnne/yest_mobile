import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { inject, observer } from "mobx-react";
import { AsyncStorage } from 'react-native';
import AuthStore from "../../stores/AuthStore";
import DataStore from "../../stores/DataStore";
import ButtonBack from "../../components/ButtonBack";
import InputWithLabel from "../../components/InputWithLabel";
import ButtonRed from "../../components/ButtonRed";
import InputDate from "../../components/InputDate";

import { fonts } from "../../constants/styles";
import { GRAY, LIGHT_GRAY, RED } from "../../assets/colors";
import { icon28, OS_IOS, wrappers } from "../../utils/style";
import { getStringValue } from "../../utils/handlers";
import { IAuthStore } from "../../stores/AuthStore";
import { ENTERCODE, PHONE } from "../../utils/navigation";

const RegistrationScreen: React.FC<{
  navigation: any;
  authStore?: IAuthStore;
}> = inject("authStore")(
  observer(({ navigation, authStore }) => {
    const { user, updateUser, registration } = authStore;
    const {removeAll} = AuthStore
    const {lolHuy} = DataStore
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");

    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.wrapper}
        contentContainerStyle={{
          paddingBottom: OS_IOS ? 60 + getBottomSpace() : 61,
        }}
      >
        <ButtonBack onPress={() => navigation.goBack()} />
        <Text style={styles.fontProfile}>{"Профиль"}</Text>
        <TouchableOpacity
          style={[wrappers.rowAlignedWrapper, { marginTop: 27 }]}
        >
          <Image
            source={require("../../assets/icons/bell-badge-icon.png")}
            style={icon28}
          />
          <Text style={styles.fontButtons}>{"Настройка уведомлений"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[wrappers.rowAlignedWrapper, { marginTop: 22 }]}
        >
          <Image
            source={require("../../assets/icons/phone-icon.png")}
            style={icon28}
          />
          <Text style={styles.fontButtons}>{"Служба поддержки"}</Text>
        </TouchableOpacity>
        <View style={[wrappers.centeredWrapper, { marginTop: 44 }]}>
          <Image
            style={{ height: 151, width: 253 }}
            source={require("../../assets/images/login.png")}
          />
        </View>
        <View style={[wrappers.centeredWrapper, { marginTop: 35 }]}>
          <Text style={fonts.font22extrabold}>{"Регистрация"}</Text>
          <Text style={[fonts.font16semibold, { color: GRAY, marginTop: 12 }]}>
            {
              "У вас все ещё нет аккаунта? Введите\n ваши данные и зарегистрируйтесь"
            }
          </Text>
          {/*<Text style={[fonts.font16semibold, {color: GRAY}]}>*/}
          {/*  {'для входа в аккаунт'}*/}
          {/*</Text>*/}
        </View>
        <InputWithLabel
          label={"Номер телефона"}
          style={{ marginTop: 24 }}
          defaultValue={""}
          keyboardType={"numeric"}
          inputPhone={true}
          value={phone}
          onChange={(value) => {
            if(value.length <= 10){
            setPhone(value)
            }
          }}
        />
        <InputWithLabel
          label={"Как вас зовут?"}
          style={{ marginTop: 24 }}
          defaultValue={""}
          value={name}
          onChange={(value) => setName(value)}
        />
        <InputDate
          label={"Дата рождения"}
          style={{ marginTop: 24 }}
          defaultValue={""}
          value={getStringValue(new Date(user.birthday))}
          keyboardType={"numeric"}
          onChange={(value) => updateUser(value, "birthday")}
        />
        <ButtonRed
          label={"Зарегистрироваться"}
          style={{ marginTop: 16 }}
          // onPress={() => navigation.navigate(ENTERCODE)}
          onPress={() => {
            registration(
              () => navigation.navigate(ENTERCODE, { empty: true, phone: phone, name: name }),
              name,
              Number(phone)
            );
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate(PHONE)}>
          <Text
            style={[
              fonts.font16semibold,
              { color: RED, marginTop: 12, textAlign: "center" },
            ]}
          >
            {"Войти"}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  })
);

const styles = StyleSheet.create({
  fontButtons: {
    marginLeft: 8,
    ...fonts.font16semibold,
  },
  fontProfile: {
    ...fonts.font28bold,
    marginTop: 24,
  },
  wrapper: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 14,
    paddingTop: 44,
    paddingBottom: 44,
  },
});

export default RegistrationScreen;
