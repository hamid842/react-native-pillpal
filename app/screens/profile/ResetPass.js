import React, {memo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

import Button from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import colors from '../../config/colors';

const ResetPass = props => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);
  return (
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
          currentPassword === newPassword ? (
            <TextInput.Icon name="check" color="green" />
          ) : (
            <TextInput.Icon
              name="eye"
              color="gray"
              onPress={() => setShowPass(!showPass)}
            />
          )
        }
        error={currentPassword === newPassword ? false : true}
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
          onPress={props.onPressSave}
          icon="check"
          color={'green'}
          style={styles.btn}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
