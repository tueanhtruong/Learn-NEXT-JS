import { CancelToken } from 'apisauce';
import shortid from 'shortid';
import cn from 'classnames';
// import {
//   formatPhoneNumberIntl,
//   formatPhoneNumber as formatLocalPhoneNumber,
// } from 'react-phone-number-input';
import { parse } from 'qs';
import dayjs from 'dayjs';
import Compressor from 'compressorjs';
import appConfig from '../app-config';
import { isEmpty } from '../validations';
// import { Location } from 'history';
// import { StateOption } from '../app-config/options';
import _ from 'lodash';

export function newCancelToken(timeout = appConfig.CONNECTION_TIMEOUT) {
  const source = CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, timeout);

  return { cancelToken: source.token };
}

export const getRandomId = (): string => shortid.generate();

export const generateArray = (length: number, initial = '') => Array(length).fill(initial);

export const randomIntFromInterval = (min = 1, max = 9999999999) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const stringify = (params: { [key: string]: number | string | string[] }) => {
  let result = '';

  Object.keys(params).forEach((key) => {
    if (!isEmpty(params[key])) {
      if (Array.isArray(params[key])) {
        let array = params[key] as string[];
        array.forEach((param: string) => {
          result += `&${key}=${encodeURIComponent(param)}`;
        });
      } else {
        result += `&${key}=${encodeURIComponent(params[key] as string | number)}`;
      }
    }
  });

  result = result.replace(/^&/, '');

  return result;
};

export const getYesNo = (value: boolean, highLightValue = 'YES') => {
  if (isEmpty(value)) return '';
  const result = value ? 'YES' : 'NO';
  const isHighLight = highLightValue === result;
  return <span className={cn({ 'has-text-danger': isHighLight })}>{result}</span>;
};

// export const getLocationState = (location: Location<string>) => {
//   const locationState = location.state;
//   const state = parse(locationState, { ignoreQueryPrefix: true });

//   return state;
// };

// export const formatPhoneNumber = (mobile: string) => {
//   if (!mobile) return '';
//   try {
//     if (mobile.startsWith('+1')) return formatLocalPhoneNumber(mobile);
//     return formatPhoneNumberIntl(mobile);
//   } catch (error) {
//     return '';
//   }
// };

export const formatDate = (value: string, format: string = 'MM/DD/YYYY') => {
  if (!value) return '';

  return dayjs(value).format(format);
};

export const getClassNameByStatus = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'is-status-pending ';
    case 'Completed':
    case 'Approved':
    case 'Active':
      return 'is-status-active';
    case 'Rejected':
      return 'is-status-rejected';
    default:
      return '';
  }
};

// export const convertStateOptionsToOptions = (options: StateOption[]) =>
//   options.map((option) => ({ value: option.name, label: option.name }));

export const getYesNoText = (value: boolean) => (value ? 'Yes' : 'No');

export const formatMoney = (value: number | string) =>
  (+value)?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });
// ?.replace(/\./g, ',');

export const moneyReg = /[\d,]+\.{0,1}\d{0,2}/;

export const MoneyInputDetect = (value: string) => `${value}`.match(moneyReg)?.[0] || '';
export const formatMoneyInput = (value: number) => {
  if (!value) return '';
  return value.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });
};
const fullDecimalReg = /\.\d{2}/;
const oneDecimalReg = /\.\d{1}$/;

export const formatMoneyCounty = (value: string) => {
  if (!value) return '0.00';
  const isHasFullDecimal = fullDecimalReg.test(value);
  const isHasOneDecimal = oneDecimalReg.test(value);
  return isHasFullDecimal ? value : isHasOneDecimal ? `${value}0` : `${value}.00`;
};

export const hourDateFormat = 'h:mm:ss a, MMMM DD, YYYY';
export const monthFormat = 'MMMM DD, YYYY';

export const emptyFunction = () => {};

export const compressFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const isImage = ['image/jpg', 'image/jpeg', 'image/png'].includes(file?.type);

    if (isImage) {
      new Compressor(file, {
        quality: 0.7,
        maxWidth: 900,
        maxHeight: 900,
        convertSize: 0,
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    } else {
      resolve(file);
    }
  });
};

export const trimUrl = (url: string) => {
  if (!url) return null;
  return url.split('?')[0];
};
//capitalize only the first letter of the string.
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
//capitalize all words of a string.
export const capitalizeWords = (string: string) => {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};

export const getFileType = (file: File) => {
  if (!!file.type) return file.type;
  if (file.name.includes('.rar')) return 'application/x-rar-compressed';
  if (file.name.includes('.7z')) return 'application/x-7z-compressed';
  return 'image/png';
};

export const getNavigateUrl = (url: string) => (url.includes('http') ? url : `https://${url}`);
export const getDate = (date: string) => (!!date ? dayjs(date).toDate() : null);
export const getDateRange = (dates: string) => {
  if (isEmpty(dates)) return [];
  const splitDates = dates?.split(' - ');
  return [getDate(splitDates?.[0]), getDate(splitDates?.[1])];
};
export const formatDateParams = (date: string, format?: string) =>
  formatDate(date, format || 'YYYY-MM-DD') || null;
export const formatDateRangeParams = (dates: [string, string]) =>
  isEmpty(dates) ? '' : `${formatDateParams(dates[0])} - ${formatDateParams(dates[1])}`;
export const formatDateRange = (dates: [string, string]) =>
  isEmpty(dates) ? '' : `${formatDate(dates[0])} - ${formatDate(dates[1])}`;

//link https://stackoverflow.com/questions/42674473/get-all-keys-of-a-deep-object-in-javascript

export const deepKeys = (t: Object, path: string[] = []) => {
  const res: string[] =
    Object(t) === t
      ? Object.entries(t) // 1
          .flatMap(([k, v]) => deepKeys(v, [...path, k]))
      : [path.join('.')]; // 2
  return res?.filter((x: string) => !/\d$/.test(x));
};

export const scrollToTopError = (error: string[]) => {
  if (!isEmpty(error)) {
    const input = document?.querySelector(`[name='${error[0]}']`);
    if (!!input?.parentElement?.scrollIntoView)
      input?.parentElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });
  }
};

export const minLenError = (min: number) => `This field must be at least ${min} characters`;
export const maxLenError = (max: number) => `This field must be at most ${max} characters`;

export const isURLImage = (url: string) => {
  if (isEmpty(url)) return false;

  const hasExtensionImage = [
    '.png',
    '.jpeg',
    '.jpg',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg',
  ].some((ext) => url?.includes(ext));

  if (hasExtensionImage) {
    return true;
  }

  const state = parse(url?.split('?')[1], { ignoreQueryPrefix: false });
  const contentType = state?.['Content-Type'];
  const isImage = ['image/jpg', 'image/jpeg', 'image/png']?.includes(contentType as string);

  return isImage;
};

export const dataURLtoFile = (dataUrl: string, filename: string) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1; // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime });
};

export const currentYear = new Date().getFullYear();

export const maskNumber = (length: number = 50) => new Array(length).fill('9').join('');
export const getStartCase = (value: string) => (value ? _.startCase(value.toLowerCase()) : '');
export const getDisplayPropertyId = (value: string) =>
  value ? value.split('-').shift()?.toUpperCase() : '--';
export const getFullName = (lastName: string, firstName: string) => {
  return `${firstName ? firstName + ' ' : ''}${lastName || ''}`;
};
export const getPercentOfNumber = (a: number, b: number) => Math.ceil(a * b) / 100;

export const convertToNumber = (value: string) => (value ? Number(value) || 0 : 0);
