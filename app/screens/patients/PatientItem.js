import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Actions from './Actions';
import colors from '../../config/colors';
import GeneralInfo from './GeneralInfo';

const PatientItem = ({patient, setEditMode}) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={`${patient?.firstName} ${patient?.lastName}`}
        subtitle={`Age:${patient?.age}`}
        left={props => (
          <Avatar.Image {...props} source={require('../../assets/hamid.png')} />
        )}
        right={props => <Actions {...props} setEditMode={setEditMode} />}
      />
      <Card.Content>
        <GeneralInfo patient={patient} />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.mainGrey,
    margin: 5,
    padding: 5,
  },
});

export default PatientItem;
