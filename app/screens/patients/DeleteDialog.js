import React from 'react';
import {Alert, Modal, StyleSheet, Text, View} from 'react-native';

import AppButton from '../../components/AppButton';

import colors from '../../config/colors';

const DeleteDialog = ({
  name,
  onDeletePress,
  openDeleteDialog,
  setOpenDeleteDialog,
}) => {
  const hideModal = () => {
    setOpenDeleteDialog(false);
  };
  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={openDeleteDialog}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setOpenDeleteDialog(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Sure? Want to delete <Text style={styles.name}>{name}</Text>?
              </Text>
              <View>
                <AppButton
                  label="No"
                  color={colors.danger}
                  icon="close"
                  onPress={hideModal}
                />
                <AppButton
                  label="Yes"
                  color="green"
                  icon="check"
                  onPress={onDeletePress}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: colors.mainBlue,
  },
});

export default DeleteDialog;
