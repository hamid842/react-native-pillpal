import React from 'react';
import {Snackbar} from 'react-native-paper';

const ErrorSnackbar = ({visible, message, onDismiss}) => {
  const onDismissSnackBar = () => {
    setTimeout(() => {
      onDismiss();
    }, 3000);
  };
  return (
    <Snackbar
      style={{backgroundColor: 'red'}}
      visible={visible}
      onDismiss={onDismissSnackBar}>
      {message}
    </Snackbar>
  );
};

export default ErrorSnackbar;
