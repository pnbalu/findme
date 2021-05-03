import { showMessage } from 'react-native-flash-message';

export const successToast = message => {
  showMessage({
    message,
    type: 'success',
    icon: { icon: 'success', position: 'right' },
    duration: 2000,
  });
};

export const errorToast = message => {
  showMessage({
    message: message,
    type: 'danger',
    icon: { icon: 'danger', position: 'right' },
    duration: 2000,
  });
};
