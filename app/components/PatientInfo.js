import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const GeneralInfo = ({title, value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titles}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.values}>
        <Text>{value}</Text>
      </View>
    </View>
  );
};

export default GeneralInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  titles: {
    width: '40%',
  },
  title: {
    fontWeight: 'bold',
  },
});
