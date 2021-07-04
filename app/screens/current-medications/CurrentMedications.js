import React from 'react';
import {StyleSheet, Text} from 'react-native';

import Screen from '../../components/Screen';
import Header from '../../layout/Header';

const CurrentMedications = ({navigation}) => {
  return (
    <Screen>
      <Header navigation={navigation} title={'Current Medics'} />

      <Text>Hello from Currenr Medication</Text>
    </Screen>
  );
};

export default CurrentMedications;

const styles = StyleSheet.create({});
