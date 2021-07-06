import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

import colors from '../config/colors';

const AppTextInput = ({label, right, left, value, onChange, onFocus}) => {
  return (
    <TextInput
      theme={{colors: {primary: 'dodgerblue'}}}
      mode="outlined"
      style={styles.input}
      label={label}
      placeholder={label}
      right={right}
      left={left}
      value={value}
      onChangeText={onChange}
      outlineColor={'dodgerblue'}
      onFocus={onFocus}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default memo(AppTextInput);
