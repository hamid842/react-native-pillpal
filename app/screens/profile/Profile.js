import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from '../../layout/Header';

const Profile = ({navigation}) => {
  return (
    <View>
      <Header navigation={navigation} title={'Profile'} />
      <Text>Hello from profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
