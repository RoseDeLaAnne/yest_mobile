import { getUuidv4, hydrate } from "../utils/stores";
import { action, observable } from "mobx";
import { SmsParams, User, ValidCodeParams } from "../api/types";
import { authorization, registration, sendSms, validCode } from "../api/api";
import { logError } from "../utils/handlers";
import { persist } from "mobx-persist";
import { Alert } from "react-native";
import { showAlertError } from "../utils/utils";
import { AsyncStorage } from "react-native";
import DataStore from "./DataStore";


const initUser = {
  sessionId:  "",
  name: "",
  phone: "",
  birthday: new Date().getTime(),
  gender: "",
};


export interface IAuthStore {
  user: User;
  loading: boolean;
  updateUser: (
    value: string | number,
    field: "name" | "phone" | "birthday" | "gender"
  ) => void;
  registration: (callback: () => void) => Promise<void>;
  auth: (callback: () => void) => Promise<void>;
  validCode: (code: number, callback: () => void, type: number) => Promise<void>;


}


class AuthStore  implements IAuthStore  {


  @persist("object") @observable user: User = initUser;
  @observable loading: boolean = false;
  @observable names: string = "";
  @observable phones: number = 0;
  @observable sesia: string = DataStore.getSessions();
  @observable kostil: boolean = false;

  @action.bound
  public changeKostil(): void{
    this.kostil = true;
  }
  @action.bound
  public changeKostilFalse(): void{
    this.kostil = false;
  }
  
  @action.bound
  public async getSesssionId(): Promise<void> {
    try {
      const sessionId = await AsyncStorage.getItem("sessionId");
      if (sessionId) {
        this.user.sessionId = sessionId;
      }
    } catch (error) {
      logError("getSesssionId", error);
    }
  }



  // get value from anothe class 

  


  //  sessionId: string;
  //   name: string;
  //   number: number;
  //   birthday: number;
  //   gender: string;

  @action.bound
  public setSesiad(ses: string): void{
    this.sesia = ses;
    console.log("sesia", this.sesia);
  }

  @action.bound
  public updateUser(
    value: string | number,
    field: "name" | "phone" | "birthday" | "gender"
  ) {
    if (field === "name" && value.toString().length < 30) {
      this.user[field] = value;
    } else if (field === "phone" && value.toString().length <= 10) {
      if (/^[0-9]*$/.test(value)) {
        this.user[field] = Number(value);
      }
    } else if (field === "birthday") {
      this.user[field] = value;
    }
  }
  
  @action.bound
  async registration(callback: () => void, name: string, phone: number) {
    try {
      this.loading = true;
      // this.user.sessionId = getUuidv4();
      this.user.gender = "men";
      // logError("registration0", this.user);

      const response = await registration(
        {
          sessionId: this.user.sessionId ,
          name: name,
          phone: phone,
          birthday: 1663924978,

        }
      );
      if (response?.data?.success) {
        logError("registration response1", response.data);
        AsyncStorage.setItem('phone', phone.toString());
        AsyncStorage.setItem('name', name);
        callback && callback();
      } else {
        showAlertError(response?.data?.message);
      }
      logError("registration response", response);
    } catch (e) {
      showAlertError(e?.message);
      logError("registration", e);
    } finally {
      this.loading = false;
    }
  }

  @action.bound
  async auth(callback: () => void, phoneOfUser: number) {
    try {
      this.loading = true;

      const params: SmsParams = {
        sessionId: this.user.sessionId,
        phone: phoneOfUser,
      };

      logError("auth0", params);

      //const response = await authorization(params);
      const response = await sendSms(params);
      if (response?.data?.success) {
        logError("auth response1", response.data);
        AsyncStorage.setItem('sessionId', response.data.sessionId);


        callback && callback();
      } else {
        showAlertError(response?.data?.message);
      }
      logError("auth response", response);
    } catch (e) {
      showAlertError(e?.message);
      logError("auth", e);
    } finally {
      this.loading = false;
    }
  }
  @action.bound
  async setUserName(name: string){
    this.names = name;
    AsyncStorage.setItem('name', name);
  }
  @action.bound
  async getName(){
    
    const lol = await AsyncStorage.getItem('name');
    return lol;
  }
  @action.bound
  async setPhone(phone: number){
    this.phones = phone;
    AsyncStorage.setItem('phone', phone.toString());
  }


  @action.bound
  async getPhone(){
    return await AsyncStorage.getItem('phone');
  }

  @action.bound
  async removeAll(){
    await AsyncStorage.removeItem('phone');
    this.phones = 0;
    await AsyncStorage.removeItem('name');
    this.names = "";
    await AsyncStorage.removeItem('sessionId');
    this.user.sessionId = "";
  }

  // @action.bound
  // async validCode(code: number, callback: () => void,phone:number,name?:string, reg?: boolean) {
  //   try {
  //     this.loading = true;
  //     let params = {
  //       sessionId:  this.user.sessionId ,
  //       code: code,
  //       type: reg ? 3: 1,
  //     };
  //     logError("validCode", params);
  //     const response = await validCode(params);
  //     if (response?.data?.success) {
  //       // AsyncStorage.setItem('sessionId', response.data.sessionId);
  //       this.kostil = true;
  //       AsyncStorage.setItem('phone', phone.toString());
  //       this.phones = phone;

  //       if(name){
  //         AsyncStorage.setItem('name', name);
  //         this.names = name;
  //       }
        
  //       callback && callback();
  //       logError("validCode response", response.data);
  //     } else {
  //       showAlertError(response?.data?.message);
  //     }
  //     logError("validCode response", response);
  //   } catch (e) {
  //     showAlertError(e?.message);
  //     logError("validCode", e);
  //   } finally {
  //     this.loading = false;
  //   }
  // }
  @action.bound
  async validCode(callback: () => void, code: number, type: number) {
    try {
      this.loading = true;

      let params = {
        sessionId: this.sesia,
        code: code,
        type: type,
      };

      logError("validCode", params);
      const response = await validCode(params);
      console.log('its authStore', response.data)

      if (response?.data?.success) {
        // AsyncStorage.setItem('sessionId', response.data.sessionId);
        this.kostil = true;
        // AsyncStorage.setItem('phoneNumber', phoneNumber.toString());
        // this.phones = phoneNumber;

        // if(name){
        //   AsyncStorage.setItem('name', name);
        //   this.names = name;
        // }
        
        callback && callback();
        logError("validCode response", response.data);
      } else {
        showAlertError(response?.data?.message);
      }
      logError("validCode response", response);
    } catch (e) {
      showAlertError(e?.message);
      logError("validCode", e);
    } finally {
      this.loading = false;
    }
  }
}

const authStore = new AuthStore();

hydrate("authStore", authStore);

export default authStore;
// import { getUser } from './../api/api';
// import {getUuidv4, hydrate} from '../utils/stores';
// import {action, observable} from 'mobx';
// import { SmsParams, User, ValidCodeParams } from "../api/types";
// import { authorization, registration, sendSms, validCode } from "../api/api";
// import {logError} from '../utils/handlers';
// import {persist} from 'mobx-persist';
// import { Alert } from "react-native";
// import { showAlertError } from "../utils/utils";
// import {AsyncStorage} from 'react-native';

// const initUser = {
//   sessionId: '08d6d9d8-4af8-11ed-850b-0050569df549',
//   name: '',
//   phone: '',
//   birthday: (new Date()).getTime(),
//   gender: '',
// };

// export interface IAuthStore {
//   user: User;
//   loading: boolean;
//   updateUser: (
//     value: string | number,
//     field: 'name' | 'phone' | 'birthday' | 'gender',
//   ) => void;
//   registration: (callback: () => void) => Promise<void>;
//   auth: (callback: () => void) => Promise<void>;
//   validCode: (code: number, callback: () => void) => Promise<void>;
// }

// class AuthStore implements IAuthStore {
//   @persist('object') @observable user: User = initUser;
//   @observable loading: boolean = false;

//   //  sessionId: string;
//   //   name: string;
//   //   number: number;
//   //   birthday: number;
//   //   gender: string;
//   @action.bound
//   public updateUser(
//     value: string | number,
//     field: 'name' | 'phone' | 'birthday' | 'gender',
//   ) {
//     if (field === 'name' && value.toString().length < 30) {
//       this.user[field] = value;
//     } else if (field === 'phone' && value.toString().length <= 10) {
//       if (/^[0-9]*$/.test(value)) {
//         this.user[field] = Number(value);
//       }
//     } else if (field === 'birthday') {
//       this.user[field] = value;
//     }
//   }

//   @action.bound
//   async registration(callback: () => void) {
//     try {
//       this.loading = true;
//       // this.user.sessionId = getUuidv4();
//       this.user.gender = 'men';
//       logError('registration0', this.user);
//       const response = await registration(this.user);
//       if (response?.data?.success) {
//         logError('registration response1', response.data);
//         callback && callback();
//       } else {
//         showAlertError(response?.data?.message);
//       }
//       logError('registration response', response);
//     } catch (e) {
//       showAlertError(e?.message);
//       logError('registration', e);
//     } finally {
//       this.loading = false;
//     }
//   }

//   @action.bound
//   async auth(callback: () => void) {
//     try {
//       this.loading = true;

//       const params: SmsParams = {
//         sessionId: this.user.sessionId,
//         phone: this.user.phone.toString(),
//         getSession: 2,
//       };

//       logError('auth0', params);

//       //const response = await authorization(params);
//       const response = await sendSms(params);
//       if (response?.data?.success) {
//         logError('auth response1', response.data);

//         callback && callback();
//       } else {
//         showAlertError(response?.data?.message);
//       }
//       logError('auth response', response);
//     } catch (e) {
//       showAlertError(e?.message);
//       logError('auth', e);
//     } finally {
//       this.loading = false;
//     }
//   }
//   @action.bound
//   async setUserName(userName: string) {
//     try {
//       this.loading = true;
//       AsyncStorage.setItem('userName', userName);
//     } catch (e) {
//       showAlertError(e?.message);
//       logError('setUserName', e);
//     } finally {
//       this.loading = false;
//     }
//   }

//   @action.bound
//   async getUserName() {
//     try {
//       this.loading = true;
//       const userName = await AsyncStorage.getItem('userName');
//       return userName;
//     } catch (e) {
//       showAlertError(e?.message);
//       logError('getUserName', e);
//     } finally {
//       this.loading = false;
//     }
//   }

//   @action.bound
//   async getUserPhone() {
//     try {
//       this.loading = true;
//       const userPhone = await AsyncStorage.getItem('userPhone');
//       return userPhone;
//     } catch (e) {
//       showAlertError(e?.message);
//       logError('getUserPhone', e);
//     } finally {
//       this.loading = false;
//     }
//   }
//   @action.bound
//   async getSessionId() {
//     try {
//       this.loading = true;
//       const sessionId = await AsyncStorage.getItem('sessionId');
//       return sessionId;
//     } catch (e) {
//       showAlertError(e?.message);
//       logError('getSessionId', e);
//     } finally {
//       this.loading = false;
//     }
//   }

//   @action.bound
//   async validCode(code: number, callback: () => void) {
//     try {
//       this.loading = true;
//       let params = {
//         sessionId: this.user.sessionId,
//         code: code,
//         type: 2,
//       };
//       logError('validCode', params);
//       const response = await validCode(params);
//       if (response?.data?.success) {
//         callback && callback();
//         logError('validCode response', response.data);
//       } else {
//         showAlertError(response?.data?.message);
//       }
//       logError('validCode response', response);
//     } catch (e) {
//       showAlertError(e?.message);
//       logError('validCode', e);
//     } finally {
//       this.loading = false;
//     }
//   }
// }

// const authStore = new AuthStore();

// hydrate('authStore', authStore);

// export default authStore;
