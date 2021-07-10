import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import Cron from 'react-native-cron-generator';

import AppButton from '../../components/AppButton';
import colors from '../../config/colors';

const AppImagePicker = ({handleChange}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <AppButton
        label="Click to Import Usage"
        color="dodgerblue"
        icon="upload"
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.pickerBtn}
      />
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalView}>
          <Cron
            showResultText={true}
            // showResultCron={true}
            value={''}
            onChange={e => handleChange(e, 'cron')}
          />
          <AppButton
            label="OK"
            color={colors.white}
            icon="check"
            style={styles.btn}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pickerBtn: {
    backgroundColor: colors.mainGrey,
    borderRadius: 5,
    height: 42,
    borderWidth: 1,
  },
  modalView: {
    width: '100%',
    height: 500,
    padding: 20,
    backgroundColor: colors.mainGrey,
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: colors.mainBlue,
    borderRadius: 10,
    height: 45,
  },
});

export default AppImagePicker;
