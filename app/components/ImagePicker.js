import React, {useState} from 'react';
import {Modal, StyleSheet, View, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import AppButton from '../components/AppButton';
import colors from '../config/colors';

const AppImagePicker = ({label, setImageUri, state}) => {
  const [modalVisible, setModalVisible] = useState(false);

  let options = {
    title: 'You can choose one image',
    maxWidth: 256,
    maxHeight: 256,
    storageOptions: {
      skipBackup: true,
    },
  };

  const takeImage = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
        Alert.alert('You did not take any image!');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.assets[0];
        setImageUri(source.uri, state);
      }
    });
  };
  const selectImage = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('You did not take any image!');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.assets[0];
        setImageUri(source.uri, state);
      }
    });
  };
  return (
    <>
      <AppButton
        label={label}
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
          <AppButton
            label="Camera"
            style={styles.btn}
            color={colors.white}
            icon="camera"
            onPress={takeImage}
          />
          <AppButton
            label="Gallery"
            style={styles.btn}
            color={colors.white}
            icon="folder-multiple-image"
            onPress={selectImage}
          />
          <AppButton
            label="Cancel"
            icon="close"
            style={styles.btn}
            color={colors.white}
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
    height: 200,
    padding: 20,
    backgroundColor: colors.mainGrey,
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: colors.mainBlue,
  },
});

export default AppImagePicker;
