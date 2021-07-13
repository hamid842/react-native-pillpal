import React, {memo, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';

import Button from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import colors from '../../config/colors';
import {getUserInfos} from '../../redux/reducers/user-infos/userInfo-reducer';

const EditProfile = props => {
  const {account, userInfos} = props;
  console.log('User', userInfos);
  const [loading, setLoading] = useState(false);
  const [editProfileData, setEditProfileData] = useState({
    id: userInfos.id,
    userCode: userInfos.userCode,
    user: userInfos.user,
    address: userInfos.address,
    phoneNumber1: userInfos.phoneNumber1,
    phoneNumber2: userInfos.phoneNumber2,
  });

  useEffect(() => {
    props.getUserInfos(account?.id);
  }, [account?.id]);

  return (
    <View>
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

const mapStateToProps = ({login, userInfos}) => ({
  account: login.account,
  userInfos: userInfos.userInfos,
});

export default connect(mapStateToProps, {getUserInfos})(memo(EditProfile));
