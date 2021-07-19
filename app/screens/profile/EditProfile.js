import React, {memo, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';

import Button from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import colors from '../../config/colors';
import SuccessSnackbar from '../../components/SuccessSnackbar';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import ActivityIndicator from '../../components/ActivityIndicator';
import users from '../../api/users';

const EditProfile = props => {
  const {account, userInfos, setEditProfile} = props;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [editProfileData, setEditProfileData] = useState({
    id: userInfos.id,
    userCode: userInfos.userCode,
    user: userInfos.user,
    address: userInfos.address,
    phoneNumber1: userInfos.phoneNumber1,
    phoneNumber2: userInfos.phoneNumber2,
  });

  const handleSaveEdition = async () => {
    setLoading(true);
    const result = users.editUserInfos(account?.id, editProfileData);
    console.log('Result', result);
    if (result.ok) {
      setLoading(false);
      setShowSuccessSnackbar(true);
      setEditProfile(false);
    } else {
      setLoading(false);
      setShowErrorSnackbar(true);
      setErrorMessage(result?.data?.title);
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />
      <Text style={styles.title}>Edit Profile</Text>
      <AppTextInput
        label="Address"
        value={editProfileData.address}
        onChange={text =>
          setEditProfileData({
            ...editProfileData,
            address: text,
          })
        }
      />
      <AppTextInput
        label="Phone No."
        value={editProfileData.phoneNumber1}
        onChange={phone =>
          setEditProfileData({
            ...editProfileData,
            phoneNumber1: '+' + phone,
          })
        }
      />
      <AppTextInput
        label="Mobile No."
        value={editProfileData.phoneNumber2}
        onChange={phone =>
          setEditProfileData({
            ...editProfileData,
            phoneNumber2: '+' + phone,
          })
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
          onPress={handleSaveEdition}
          icon="check"
          color={'green'}
          style={styles.btn}
        />
      </View>
      <SuccessSnackbar
        visible={showSuccessSnackbar}
        message="Updated Successfully."
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

const mapStateToProps = ({userInfos, login}) => ({
  account: login.account,
  userInfos: userInfos.userInfos,
});

export default connect(mapStateToProps, {})(memo(EditProfile));
