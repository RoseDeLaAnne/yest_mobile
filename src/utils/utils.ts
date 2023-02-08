import {useEffect, useState} from 'react';
import {duration} from 'moment';
import {Alert} from 'react-native';

export const urlProducts = 'https://marketa.su/uploads/images/products/';
export const urlShops = 'https://marketa.su/uploads/images/events/';

export const getDuration = (number1 = 60) => {
  const [number, setNumber] = useState(duration(0, 'milliseconds'));

  const getNumber = (number: number) => {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  };

  useEffect(() => {
    const timer = setInterval(
      () => setNumber(duration(number1-- * 1000, 'milliseconds')),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  return `${getNumber(number.seconds())}`;
};

export const showAlertError = (message: string) => {
  Alert.alert('Ошибка!', message ? message : 'Ошибка соединения');
};
