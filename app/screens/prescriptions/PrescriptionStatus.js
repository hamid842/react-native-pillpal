import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';

const PrescriptionStatus = ({value, onValueChange}) => {
  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      <View style={styles.group}>
        <View style={styles.radio}>
          <Text>Active</Text>
          <RadioButton value="ACTIVE" />
        </View>
        <View style={styles.radio}>
          <Text>All</Text>
          <RadioButton value="All" />
        </View>
      </View>
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default memo(PrescriptionStatus);
