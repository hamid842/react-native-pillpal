import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const AppButton = ({color, label, icon, onPress, style}) => {
  return (
    <Button
      mode="outlined"
      uppercase={false}
      color={color}
      style={[styles.btn, style, {borderColor: color}]}
      icon={icon}
      onPress={onPress}>
      {label}
    </Button>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btn: {
    margin: 10,
    borderRadius: 25,
  },
});
