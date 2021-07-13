import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Header from '../../layout/Header';
import Devices from './Devices';
import GeneralInfo from './GeneralInfo';
import ProfileTop from './ProfileTop';
import EditProfile from './EditProfile';
import ResetPass from './ResetPass';

const Profile = ({navigation}) => {
  const [editProfile, setEditProfile] = useState(false);
  const [showResetPass, setShowResetPass] = useState(false);

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

  return (
    <>
      <Header navigation={navigation} title={'Profile'} />
      <View>
        {!editProfile && !showResetPass && (
          <>
            <ProfileTop
              onPressLock={handlePressLock}
              onPressEdit={handlePressEdit}
            />
            <GeneralInfo />
            <Devices />
          </>
        )}
        {editProfile && (
          <EditProfile
            onPressCancel={handlePressCancel}
            onPressSave={handlePressSave}
          />
        )}
        {showResetPass && <ResetPass onPressCancel={handlePressCancel} />}
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
