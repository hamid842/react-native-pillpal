import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List, Avatar} from 'react-native-paper';
import dayjs from 'dayjs';
import PrescriptionDetails from './PrescriptionDetails';

const PrescriptionItem = ({prescription}) => {
  return (
    <List.Accordion
      title={`${prescription?.prescriptionCode}`}
      description={`Promised:${dayjs(prescription?.issueDate).format(
        'YYYY-MM-DD',
      )}`}
      left={props => (
        <Avatar.Image
          {...props}
          size={40}
          source={require('../../assets/atorvastatin.jpg')}
        />
      )}
      style={styles.presItems}>
      <PrescriptionDetails prescription={prescription} />
    </List.Accordion>
  );
};

export default PrescriptionItem;

const styles = StyleSheet.create({
  presItems: {
    backgroundColor: '#bfa734',
    marginVertical: 5,
    borderRadius: 10,
  },
});
