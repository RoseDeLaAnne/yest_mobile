import {values} from 'mobx';

export const log = message => {
  console.log('LOGGER:  ' + JSON.stringify(message));
};

export const logError = (module: string, message: object) => {
  console.log('ERROR IN: ' + module);
  // console.log('ERROR MESSAGE: ' + JSON.stringify(message));
};

export const getStringValue = (
  value: string | number | null | undefined,
): string => {
  if (value === null || value === undefined) {
    return '';
  } else {
    return value.toString();
  }
};

export const getNumberValue = (
  value: string | number | null | undefined,
): number => {
  if (value === null || value === undefined) {
    return 0;
  } else {
    return new Number(value);
  }
};
