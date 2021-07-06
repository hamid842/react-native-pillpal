import React, {memo, useState} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../config/colors';
import DeleteDialog from './DeleteDialog';
import {selectPatient} from '../../redux/reducers/patients/patients-reducer';

const Actions = props => {
  const {
    patient,
    setEditMode,
    openDeleteDialog,
    setOpenDeleteDialog,
    onDeletePress,
  } = props;
  const [showActions, setShowActions] = useState(false);

  const onPressEditIcon = () => {
    setShowActions(true);
    props.selectPatient(patient?.id);
  };
  return (
    <View {...props}>
      {!showActions ? (
        <Icon name="account-edit-outline" size={30} onPress={onPressEditIcon} />
      ) : (
        <View style={styles.container}>
          <Icon
            name="file-edit-outline"
            size={25}
            color={colors.mainBlue}
            onPress={() => setEditMode(true)}
          />
          <Icon
            name="delete-outline"
            size={30}
            color={colors.danger}
            style={{marginLeft: 15}}
            onPress={() => setOpenDeleteDialog(true)}
          />
          <Icon
            name="close"
            size={30}
            style={{marginLeft: 15}}
            onPress={() => setShowActions(false)}
          />
          <DeleteDialog
            name={`${patient?.firstName} ${patient?.lastName}`}
            onDeletePress={onDeletePress}
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default connect(null, {selectPatient})(memo(Actions));
