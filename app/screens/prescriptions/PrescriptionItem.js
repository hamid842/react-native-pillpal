import React from 'react';
import {StyleSheet} from 'react-native';
import {List, Avatar} from 'react-native-paper';
import dayjs from 'dayjs';
import PrescriptionDetails from './PrescriptionDetails';

const PrescriptionItem = ({prescription}) => {
  console.log(prescription);
  return (
    <List.Accordion
      //! TODO Check this line
      title={`${prescription?.medicine?.brandName}`}
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
