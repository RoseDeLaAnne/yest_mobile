import {AsyncStorage} from 'react-native';
import {create} from 'mobx-persist';

export const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

export const getUuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
