import React, {memo} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, ScrollView} from 'react-native';

import Header from '../../layout/Header';
import PatientItem from './PatientItem';

const Patients = ({navigation, patients}) => {
  return (
    <>
      <ScrollView>
        <Header navigation={navigation} title={'Patients'} />
        {patients.length > 0 ? (
          patients.map((patient, index) => (
            <PatientItem key={index} patient={patient} />
          ))
        ) : (
          <View>
            <Text>No Patient</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = ({login, patients}) => ({
  account: login.account,
  patients: patients.patients,
});

export default connect(mapStateToProps, {})(memo(Patients));
