import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from '../../layout/Header';

const AddNewPrescription = ({navigation}) => {
  return (
    <View>
      <Header navigation={navigation} title={'Add New Prescription'} />
      <Text>Hello from add new</Text>
    </View>
  );
};

export default AddNewPrescription;

const styles = StyleSheet.create({});
