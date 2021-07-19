import React from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';

import colors from '../config/colors';

const ErrorSnackbar = ({visible, message, onDismiss}) => {
  const onDismissSnackBar = () => {
    setTimeout(() => {
      onDismiss();
    }, 2000);
  };
  return (
    <Snackbar
      style={styles.snackbar}
      visible={visible}
      onDismiss={onDismissSnackBar}>
      {message}
    </Snackbar>
  );
};
const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: colors.bgDanger,
  },
});

export default ErrorSnackbar;
