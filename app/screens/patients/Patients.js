import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from '../../layout/Header';

const Patients = ({navigation}) => {
  return (
    <View>
      <Header navigation={navigation} title={'Patients'} />
      <Text>Hello from patients</Text>
    </View>
  );
};

export default Patients;

const styles = StyleSheet.create({});
