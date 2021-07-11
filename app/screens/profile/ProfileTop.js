import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../config/colors';

const ProfileTop = (
  account,
  setEditProfile,
  editProfile,
  showResetPass,
  setShowResetPass,
) => {
  const handleClickEditProfile = () => {
    setShowResetPass(false);
    setEditProfile(!editProfile);
  };

  const handleClickResetPass = () => {
    setEditProfile(false);
    setShowResetPass(!showResetPass);
  };
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../../assets/hamid.png')}
          style={styles.image}
        />
        <View style={styles.iconContainer}>
          <Icon
            name="lock"
            size={25}
            color={colors.white}
            onPress={() => {
              setEditProfile(false);
              setShowResetPass(!showResetPass);
            }}
          />
          <Icon
            name="account-edit"
            size={25}
            color={colors.white}
            onPress={() => {
              setShowResetPass(false);
              setEditProfile(!editProfile);
            }}
          />
          <Icon name="camera" size={25} color={colors.white} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 170,
    backgroundColor: colors.bgGrey,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 15,
  },
  iconContainer: {
    width: '80%',
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-around',
  },
});

export default ProfileTop;
