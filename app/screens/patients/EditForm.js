import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';

import Button from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import DatePicker from '../../components/DatePicker';
import colors from '../../config/colors';

const EditForm = ({setAddMode, setEditMode}) => {
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

  const handlePressCancel = () => {
    setAddMode(false);
    setEditMode(false);
  };
  return (
    <>
      <AppTextInput label="First Name" />
      <AppTextInput label="Last Name" />
      <AppTextInput label="ID No." />
      <DatePicker />
      <AppTextInput label="Address" />
      <AppTextInput label="Email" />
      <AppTextInput label="Phone Number" />
      <AppTextInput label="Mobile Number" />
      <AppTextInput label="Marital Status" />
      <AppTextInput label="Age" right={<TextInput.Affix text="Years old" />} />
      <AppTextInput label="Height" right={<TextInput.Affix text="Cm" />} />
      <AppTextInput label="Weight" right={<TextInput.Affix text="Kg" />} />
      <Dropdown
        label="Blood Type"
        data={bloodTypeOptions}
        containerStyle={styles.dropdown}
        overlayStyle={styles.overlay}
      />
      <AppTextInput label="Relationship" />
      <View style={styles.btnContainer}>
        <Button
          label="Cancel"
          color={colors.danger}
          icon="close"
          style={styles.btn}
          onPress={handlePressCancel}
        />
        <Button label="Save" color="green" icon="check" style={styles.btn} />
      </View>
    </>
  );
};

export default EditForm;

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
