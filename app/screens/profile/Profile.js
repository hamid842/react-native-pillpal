import React, {memo, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';

import Header from '../../layout/Header';
import Devices from './Devices';
import GeneralInfo from './GeneralInfo';
import ProfileTop from './ProfileTop';
import EditProfile from './EditProfile';
import ResetPass from './ResetPass';
import SuccessSnackbar from '../../components/SuccessSnackbar';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import {getUserInfos} from '../../redux/reducers/user-infos/userInfo-reducer';

const Profile = props => {
  const {navigation, account} = props;
  const [editProfile, setEditProfile] = useState(false);
  const [showResetPass, setShowResetPass] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const handlePressEdit = () => {
    setShowResetPass(false);
    setEditProfile(true);
  };

  const handlePressLock = () => {
    setEditProfile(false);
    setShowResetPass(true);
  };

  const handlePressCancel = () => {
    setEditProfile(false);
    setShowResetPass(false);
  };

  const handlePressSave = () => {
    console.log('Save');
  };

  useEffect(() => {
    props.getUserInfos(account?.id);
  }, [account?.id]);

  return (
    <>
      <Header navigation={navigation} title={'Profile'} />
      <View style={styles.container}>
        {!editProfile && !showResetPass && (
          <>
            <ProfileTop
              onPressLock={handlePressLock}
              onPressEdit={handlePressEdit}
            />
            <GeneralInfo />
            <Devices
              setShowSuccessSnackbar={setShowSuccessSnackbar}
              setShowErrorSnackbar={setShowErrorSnackbar}
            />
          </>
        )}
        {editProfile && (
          <EditProfile
            onPressCancel={handlePressCancel}
            setEditProfile={setEditProfile}
          />
        )}
        {showResetPass && <ResetPass onPressCancel={handlePressCancel} />}
      </View>
      <SuccessSnackbar
        visible={showSuccessSnackbar}
        message="Device Deleted Successfully."
        onDismiss={() => setShowSuccessSnackbar(false)}
      />
      <ErrorSnackbar
        visible={showErrorSnackbar}
        message={'Something went wrong!'}
        onDismiss={() => setShowErrorSnackbar(false)}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = ({login}) => ({
  account: login.account,
});

export default connect(mapStateToProps, {getUserInfos})(memo(Profile));
