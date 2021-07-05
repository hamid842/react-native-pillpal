import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

import Button from '../../components/AppButton';
import TextInput from '../../components/AppTextInput';
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
      <TextInput label="First Name" />
      <TextInput label="Last Name" />
      <TextInput label="ID No." />
      <TextInput label="Birth Date" />
      <TextInput label="Address" />
      <TextInput label="Email" />
      <TextInput label="Phone Number" />
      <TextInput label="Mobile Number" />
      <TextInput label="Marital Status" />
      <TextInput label="Age" />
      <TextInput label="Height" />
      <TextInput label="Weight" />
      <Dropdown
        label="Blood Type"
        data={bloodTypeOptions}
        containerStyle={styles.dropdown}
        overlayStyle={styles.overlay}
      />
      <TextInput label="Relationship" />
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
