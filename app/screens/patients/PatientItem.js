import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Card, Avatar} from 'react-native-paper';

import Actions from './Actions';
import colors from '../../config/colors';
import GeneralInfo from './GeneralInfo';

const PatientItem = props => {
  const {patient, setEditMode, onDeletePress} = props;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  return (
    <Card style={styles.card}>
      <Card.Title
        title={`${patient?.firstName} ${patient?.lastName}`}
        subtitle={`Age:${patient?.age}`}
        left={props => (
          <Avatar.Image {...props} source={require('../../assets/hamid.png')} />
        )}
        right={props => (
          <Actions
            {...props}
            onDeletePress={onDeletePress}
            patient={patient}
            setEditMode={setEditMode}
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
          />
        )}
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
