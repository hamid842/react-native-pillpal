import React, {memo, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import dayjs from 'dayjs';

import Button from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import DatePicker from '../../components/DatePicker';
import colors from '../../config/colors';
import patientsApi from '../../api/patients';
import ActivityIndicator from '../../components/ActivityIndicator';
import SuccessSnackbar from '../../components/SuccessSnackbar';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import {getAllPatients} from '../../redux/reducers/patients/patients-reducer';

const EditForm = props => {
  const {editMode, selectedPatient, setAddMode, setEditMode, account} = props;
  const [loading, setLoading] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [newPatientInfo, setNewPatientInfo] = useState({
    id: editMode ? selectedPatient?.id : null,
    firstName: editMode ? selectedPatient?.firstName : '',
    lastName: editMode ? selectedPatient?.lastName : '',
    birthDate: editMode
      ? dayjs(selectedPatient?.birthDate).format('YYYY-MM-DD')
      : '',
    idNo: editMode ? selectedPatient?.idNo : '',
    address: editMode ? selectedPatient?.address : '',
    phoneNumber1: editMode ? selectedPatient?.phoneNumber1 : '',
    phoneNumber2: editMode ? selectedPatient?.phoneNumber2 : '',
    email: editMode ? selectedPatient?.email : '',
    height: editMode ? selectedPatient?.height.toString() : '',
    age: editMode ? selectedPatient?.age.toString() : '',
    weight: editMode ? selectedPatient?.weight.toString() : '',
    bloodType: editMode ? selectedPatient?.bloodType : '',
    maritalStatus: editMode ? selectedPatient?.maritalStatus : '',
    relationshipWithUser: editMode ? selectedPatient?.relationshipWithUser : '',
    userInfo: {
      id: account?.id,
    },
  });
  console.log(newPatientInfo);
  const bloodTypeOptions = [
    {label: 'B+', value: 'B_p'},
    {label: 'A+', value: 'A_p'},
    {label: 'B-', value: 'B_n'},
    {label: 'A-', value: 'A_n'},
    {label: 'AB+', value: 'AB_p'},
    {label: 'AB-', value: 'AB_n'},
    {label: 'O+', value: 'O_p'},
    {label: 'O-', value: 'O_n'},
  ];

  const maritalStatusOptions = [
    {label: 'Married', value: 'MARRIED'},
    {label: 'Single', value: 'SINGLE'},
  ];

  const handlePressCancel = () => {
    setAddMode(false);
    setEditMode(false);
  };

  const handleChange = (text, name) => {
    setNewPatientInfo({...newPatientInfo, [name]: text});
  };
  const handleEditPatient = async () => {
    setLoading(true);
    const result = await patientsApi.editPatient(
      selectedPatient.id,
      newPatientInfo,
    );
    if (result.ok) {
      setLoading(false);
      setShowSuccessSnackbar(true);
      setEditMode(false);
      props.getAllPatients(account?.id);
    } else {
      setLoading(false);
      setShowErrorSnackbar(true);
    }
  };
  const handleCreatePatient = async () => {
    setLoading(true);
    const result = await patientsApi.createPatient(newPatientInfo);
    if (result.ok) {
      setLoading(false);
      setShowSuccessSnackbar(true);
      setAddMode(false);
      props.getAllPatients(account?.id);
    } else {
      setLoading(false);
      setShowErrorSnackbar(true);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <AppTextInput
        label="First Name"
        value={newPatientInfo.firstName}
        onChange={text => handleChange(text, 'firstName')}
      />
      <AppTextInput
        label="Last Name"
        value={newPatientInfo.lastName}
        onChange={text => handleChange(text, 'lastName')}
      />
      <AppTextInput
        label="ID No."
        value={newPatientInfo.idNo}
        onChange={text => handleChange(text, 'idNo')}
      />
      {editMode ? (
        <AppTextInput
          label="ID No."
          value={dayjs(newPatientInfo.birthDate).format('YYYY-MM-DD')}
          onChange={text => handleChange(text, 'birthDate')}
        />
      ) : (
        <DatePicker
          value={newPatientInfo.birthDate}
          onChange={date => handleChange(dayjs(date?.date), 'birthDate')}
        />
      )}
      <AppTextInput
        label="Address"
        value={newPatientInfo.address}
        onChange={text => handleChange(text, 'address')}
      />
      <AppTextInput
        label="Email"
        value={newPatientInfo.email}
        onChange={text => handleChange(text, 'email')}
      />
      <AppTextInput
        keyboardType="numeric"
        label="Phone Number"
        value={newPatientInfo.phoneNumber1}
        onChange={text => handleChange(text, 'phoneNumber1')}
      />
      <AppTextInput
        keyboardType="numeric"
        label="Mobile Number"
        value={newPatientInfo.phoneNumber2}
        onChange={text => handleChange(text, 'phoneNumber2')}
      />
      <Dropdown
        label="Marital Status"
        value={newPatientInfo.maritalStatus}
        data={maritalStatusOptions}
        containerStyle={styles.dropdown}
        overlayStyle={styles.overlay}
        onChangeText={text => handleChange(text, 'maritalStatus')}
      />
      <AppTextInput
        keyboardType="numeric"
        label="Age"
        value={newPatientInfo.age}
        right={<TextInput.Affix text="Years old" />}
        onChange={text => handleChange(text, 'age')}
      />
      <AppTextInput
        keyboardType="numeric"
        label="Height"
        value={newPatientInfo.height}
        right={<TextInput.Affix text="Cm" />}
        onChange={text => handleChange(text, 'height')}
      />
      <AppTextInput
        keyboardType="numeric"
        label="Weight"
        value={newPatientInfo.weight}
        right={<TextInput.Affix text="Kg" />}
        onChange={text => handleChange(text, 'weight')}
      />
      <Dropdown
        label="Blood Type"
        value={newPatientInfo.bloodType}
        data={bloodTypeOptions}
        containerStyle={styles.dropdown}
        overlayStyle={styles.overlay}
        onChangeText={text => handleChange(text, 'bloodType')}
      />
      <AppTextInput
        label="Relationship"
        value={newPatientInfo.relationshipWithUser}
        onChange={text => handleChange(text, 'relationshipWithUser')}
      />
      <View style={styles.btnContainer}>
        <Button
          label="Cancel"
          color={colors.danger}
          icon="close"
          style={styles.btn}
          onPress={handlePressCancel}
        />
        <Button
          label="Save"
          color="green"
          icon="check"
          style={styles.btn}
          onPress={editMode ? handleEditPatient : handleCreatePatient}
        />
      </View>
      <SuccessSnackbar
        visible={showSuccessSnackbar}
        message="Patient Edited Successfully."
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
  btnContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: 100,
  },
  dropdown: {
    justifyContent: 'center',
    height: 40,
    borderTopWidth: 1,
    borderBottomColor: 'dodgerblue',
    borderTopColor: 'dodgerblue',
    borderRightColor: 'dodgerblue',
    borderLeftColor: 'dodgerblue',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    padding: 5,
    paddingBottom: 20,
  },
  overlay: {},
});

export default connect(null, {getAllPatients})(memo(EditForm));
