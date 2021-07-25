import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import colors from '../../config/colors';

const NoPatient = () => {
  return (
    <View style={styles.container}>
      <Text>No Patient added yet!</Text>
    </View>
  );
};

export default NoPatient;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 200,
    backgroundColor: colors.mainGrey,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
