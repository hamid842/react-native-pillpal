import React from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

const SelectField = ({label, data, onChange, value}) => {
  return (
    <Dropdown
      label={label}
      value={value}
      data={data}
      containerStyle={styles.dropdown}
      onChangeText={onChange}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default SelectField;
