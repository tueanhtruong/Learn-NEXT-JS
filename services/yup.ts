import { isValidPhoneNumber } from 'react-phone-number-input';
import * as yup from 'yup';
import { ErrorService } from '.';

yup.setLocale({
  mixed: {
    required: ErrorService.MESSAGES.required,
  },
  string: {
    email: ErrorService.MESSAGES.invalidEmail,
    // eslint-disable-next-line
    min: 'This field must be at least ${min} characters',
    // eslint-disable-next-line
    max: 'This field must be at most ${max} characters',
  },
});

declare module 'yup' {
  interface StringSchema {
    phone(): StringSchema;
    password(): StringSchema;
    letterOnly(): StringSchema;
  }
}

yup.addMethod<yup.StringSchema>(yup.string, 'phone', function (message) {
  return this.test('isValidPhone', message, function (value) {
    const { path, createError } = this;

    if (!value) return true;

    if (!isValidPhoneNumber(value)) {
      return createError({
        path,
        message: message ?? ErrorService.MESSAGES.invalidPhone,
      });
    }

    return true;
  });
});

yup.addMethod<yup.StringSchema>(yup.string, 'password', function (message) {
  return this.test('isValidName', message, function (value) {
    const { path, createError } = this;

    if (!value) return true;

    if (!/.{8,}/.test(value))
      return createError({
        path,
        message: message ?? 'Your password must be at least 8 characters.',
      });
    if (!/[a-z]/.test(value) || !/[A-Z]/.test(value))
      return createError({
        path,
        message: message ?? 'Your password must have at least one upper and lower case letter',
      });
    if (!/[0-9]/.test(value))
      return createError({
        path,
        message: message ?? 'Your password must have at one number',
      });
    if (!/.*[!@#$%?=*&.]/.test(value))
      return createError({
        path,
        message: message ?? 'Your password must have at one special character',
      });

    return true;
  });
});

yup.addMethod<yup.StringSchema>(yup.string, 'letterOnly', function (message) {
  return this.test('isValidName', message, function (value) {
    const { path, createError } = this;

    if (!value) return true;

    const re = /^[aA-zZ\s]+$/;

    if (!re.test(value)) {
      return createError({
        path,
        message: message ?? ErrorService.MESSAGES.onlyLetter,
      });
    }

    return true;
  });
});

export default yup;
