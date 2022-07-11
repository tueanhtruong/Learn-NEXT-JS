const MESSAGES = {
  invalidEmail: 'Email is invalid',
  invalidPhone: 'Phone number is invalid',
  unknown: 'An error has occurred',
  required: 'Field cannot be blank',
  accountNotExist: 'Username does not exist',
  incorrectAccount: 'Incorrect username or password',
  incorrectPassword: 'Incorrect password.',
  onlyLetter: 'Only alphabets are allowed for this field.',
};

const handler = (error: Error) => {
  console.error(error);
};

export default {
  handler,
  MESSAGES,
};
