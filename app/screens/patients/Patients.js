import React, {memo, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';

import Button from '../../components/AppButton';
import Header from '../../layout/Header';
import PatientItem from './PatientItem';
import colors from '../../config/colors';
import EditForm from './EditForm';

const Patients = ({navigation, patients}) => {
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  return (
    <>
      <Header navigation={navigation} title={'Patients'} />
      <Button
        color="dodgerblue"
        label="Add New Patient"
        icon="plus"
        style={styles.addBtn}
        onPress={() => setAddMode(true)}
      />
      <ScrollView>
        {patients.length > 0 &&
          !addMode &&
          !editMode &&
          patients.map((patient, index) => (
            <PatientItem
              key={index}
              patient={patient}
              setEditMode={setEditMode}
            />
          ))}
        {(addMode || editMode) && (
          <EditForm setAddMode={setAddMode} setEditMode={setEditMode} />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    margin: 10,
    borderRadius: 25,
  },
});

const mapStateToProps = ({login, patients}) => ({
  account: login.account,
  patients: patients.patients,
});

export default connect(mapStateToProps, {})(memo(Patients));
