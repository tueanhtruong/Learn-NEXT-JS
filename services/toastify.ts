import { toast, ToastOptions } from 'react-toastify';

const error = (error?: string, options: ToastOptions = { icon: false }) => {
  console.log('errorHandler', error);
  toast.error(
    error ? error : 'An error has occurred. Please check your data and try again.',
    options
  );
};

const success = (message: string, options: ToastOptions = { icon: false, autoClose: 5000 }) => {
  toast.success(message, options);
};

const warning = (message: string, options: ToastOptions = { icon: false }) => {
  console.log('warningHandler', message);
  toast.warning(message, options);
};
const info = (message: string, options: ToastOptions = { icon: false }) => {
  toast.info(message, { ...options });
};

export default {
  error,
  success,
  warning,
  info,
};
