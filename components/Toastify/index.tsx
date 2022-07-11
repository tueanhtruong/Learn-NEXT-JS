import { ToastContainer } from 'react-toastify';

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      icon={false}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{ minWidth: '392px' }}
      theme={'colored'}
    />
  );
};
