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

  return (
    <>
      <Header navigation={navigation} title={'Profile'} />
      <View>
        {!editProfile && !showResetPass && (
          <>
            <ProfileTop
              editProfile={editProfile}
              setEditProfile={setEditProfile}
              showResetPass={showResetPass}
              setShowResetPass={setShowResetPass}
            />
            <GeneralInfo />
            <Devices />
          </>
        )}
        {editProfile && <EditProfile />}
        {showResetPass && <ResetPass />}
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
