import React from 'react';
import {Snackbar} from 'react-native-paper';

const SuccessSnackbar = ({visible, message, onDismiss}) => {
  const onDismissSnackBar = () => {
    setTimeout(() => {
      onDismiss();
    }, 3000);
  };
  return (
    <Snackbar
      style={{backgroundColor: 'green'}}
      visible={visible}
      onDismiss={onDismissSnackBar}>
      {message}
    </Snackbar>
  );
};

export default SuccessSnackbar;
