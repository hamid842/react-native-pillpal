import React from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../config/colors';

const SelectField = ({
  schema,
  open,
  data,
  value,
  setOpen,
  setValue,
  setItems,
  searchable,
  loading,
  placeholder,
  onChangeSearchText,
  onChangeValue,
}) => {
  return (
    <DropDownPicker
      schema={schema}
      open={open}
      value={value}
      items={data}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeSearchText={onChangeSearchText && onChangeSearchText}
      onChangeValue={onChangeSearchText && onChangeValue}
      searchable={searchable}
      loading={loading}
      placeholder={placeholder}
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropDownContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 42,
    width: '95%',
    borderColor: 'dodgerblue',
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: colors.mainGrey,
  },
  dropDownContainerStyle: {
    marginHorizontal: 15,
    width: '92%',
    borderWidth: 0,
    backgroundColor: colors.mediumGrey,
    zIndex: 99999,
  },
});

export default SelectField;
