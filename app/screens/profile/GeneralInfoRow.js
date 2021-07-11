import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GeneralInfoRow = ({icon, title, value}) => {
  return (
    <View style={styles.row}>
      <View style={styles.titlesContainer}>
        <Icon name={icon} size={20} />
        <Text style={styles.titles}>{title}</Text>
      </View>
      <View>
        <Text>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titlesContainer: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  titles: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default GeneralInfoRow;
