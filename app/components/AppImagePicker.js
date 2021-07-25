import React, {memo, useState} from 'react';
import {connect} from 'react-redux';
import {Modal, StyleSheet, View, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import AppButton from './AppButton';
import colors from '../config/colors';
import images from '../api/images';
import {setImage} from '../redux/reducers/images/images-reducer';

const AppImagePicker = props => {
  const {
    visible,
    onRequestClose,
    onPressCancel,
    renderComponent,
    imageSourceType,
    setImageUri,
  } = props;
  // const [imageUri, setImageUri] = useState('');
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
        // setImageUri(source.uri, state);
        images.uploadImage(source.uri, imageSourceType, setImageUri);

        // console.log('Take Image', result);
        // props.setImage(source.uri, imageSourceType);
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
        // setImageUri(source.uri, state);
        const result = images.uploadImage(
          source.uri,
          imageSourceType,
          setImageUri,
        );

        // props.setImage(result, imageSourceType);
      }
    });
  };
  return (
    <>
      {renderComponent}
      <Modal
        transparent
        animationType="slide"
        visible={visible}
        onRequestClose={onRequestClose}>
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
            onPress={onPressCancel}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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

export default connect(null, {setImage})(memo(AppImagePicker));
