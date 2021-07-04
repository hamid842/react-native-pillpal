import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from '../../layout/Header';

const Prescriptions = ({navigation}) => {
  return (
    <View>
      <Header navigation={navigation} title={'Prescriptions'} />
      <Text>Hello from prescriptions</Text>
    </View>
  );
};

export default Prescriptions;

const styles = StyleSheet.create({});
