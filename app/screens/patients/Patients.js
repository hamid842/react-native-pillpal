import React, {memo, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';

import Button from '../../components/AppButton';
import Header from '../../layout/Header';
import PatientItem from './PatientItem';
import EditForm from './EditForm';
import patientsApi from '../../api/patients';
import ActivityIndicator from '../../components/ActivityIndicator';
import SuccessSnackbar from '../../components/SuccessSnackbar';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import NoPatient from './NoPatient';
import {getAllPatients} from '../../redux/reducers/patients/patients-reducer';

const Patients = props => {
  const {navigation, patients, selectedPatient, account} = props;
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  useEffect(() => {
    props.getAllPatients(account?.id);
  }, []);

  const deletePatient = async id => {
    setLoading(true);
    const result = await patientsApi.deletePatient(id);
    if (result.ok) {
      setLoading(false);
      setShowSuccessSnackbar(true);
      props.getAllPatients(account?.id);
    } else {
      setLoading(false);
      setShowErrorSnackbar(true);
    }
  };
  return (
    <>
      <ActivityIndicator visible={loading} />
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
              onDeletePress={() => deletePatient(patient.id)}
              setEditMode={setEditMode}
            />
          ))}
        {(addMode || editMode) && (
          <EditForm
            account={account}
            selectedPatient={selectedPatient}
            editMode={editMode}
            setAddMode={setAddMode}
            setEditMode={setEditMode}
          />
        )}
        {patients.length == 0 && <NoPatient />}
      </ScrollView>
      <SuccessSnackbar
        visible={showSuccessSnackbar}
        message="Patient Deleted Successfully."
        onDismiss={() => setShowSuccessSnackbar(false)}
      />
      <ErrorSnackbar
        visible={showErrorSnackbar}
        message="Something went wrong!"
        onDismiss={() => setShowErrorSnackbar(false)}
      />
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
  selectedPatient: patients.selectedPatient,
});

export default connect(mapStateToProps, {getAllPatients})(memo(Patients));
