import React, {memo, useState} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import users from '../../api/users';

import Button from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import colors from '../../config/colors';
import SuccessSnackbar from '../../components/SuccessSnackbar';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import ActivityIndicator from '../../components/ActivityIndicator';

const ResetPass = props => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const handleChangePassword = async () => {
    Keyboard.dismiss();
    setLoading(true);
    const result = await users.changePassword({currentPassword, newPassword});
    if (result.ok) {
      setLoading(false);
      setShowSuccessSnackbar(true);
      setCurrentPassword('');
      setNewPassword('');
      props.onPressCancel();
    } else {
      setErrorMessage(result?.data?.title);
      setLoading(false);
      setShowErrorSnackbar(true);
    }
  };
  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />
      <View>
        <Text style={styles.title}>Reset Password</Text>
        <AppTextInput
          secureTextEntry={showPass}
          label="Current Password"
          value={currentPassword}
          onChange={text => setCurrentPassword(text)}
          right={
            <TextInput.Icon
              name="eye"
              color="gray"
              onPress={() => setShowPass(!showPass)}
            />
          }
        />
        <AppTextInput
          secureTextEntry={showPass}
          label="New Password"
          value={newPassword}
          onChange={text => setNewPassword(text)}
          right={
            <TextInput.Icon
              name="eye"
              color="gray"
              onPress={() => setShowPass(!showPass)}
            />
          }
        />

        <View style={styles.buttons}>
          <Button
            label="Cancel"
            onPress={props.onPressCancel}
            icon="close"
            color={colors.danger}
            style={styles.btn}
          />
          <Button
            label="Save"
            onPress={handleChangePassword}
            icon="check"
            color={'green'}
            style={styles.btn}
          />
        </View>
      </View>
      <SuccessSnackbar
        visible={showSuccessSnackbar}
        message="Password Updated Successfully."
        onDismiss={() => setShowSuccessSnackbar(false)}
      />
      <ErrorSnackbar
        visible={showErrorSnackbar}
        message={errorMessage ? errorMessage : 'Something went wrong!'}
        onDismiss={() => setShowErrorSnackbar(false)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: 100,
  },
});

export default memo(ResetPass);
