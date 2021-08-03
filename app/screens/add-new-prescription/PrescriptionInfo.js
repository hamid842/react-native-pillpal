import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import dayjs from 'dayjs';

import DatePicker from '../../components/DatePicker';
import AppImagePicker from '../../components/AppImagePicker';
import AppButton from '../../components/AppButton';
import RenderImage from '../../components/RenderImage';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi';
import images from '../../api/images';

const PrescriptionInfo = ({data, handleChange}) => {
  const imageDownloadApi = useApi(images.downloadImage);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState('');
  const [downloadedImage, setDownloadedImage] = useState('');

  useEffect(() => {
    uploadedImageName &&
      imageDownloadApi.request(uploadedImageName, setDownloadedImage);
  }, [uploadedImageName]);

  return (
    <View>
      <DatePicker
        label="Promised"
        value={data?.issueDate}
        onChange={date => handleChange(dayjs(date?.date), 'issueDate')}
      />
      <AppTextInput
        label="Barcode"
        value={data?.barCode}
        onChange={text => handleChange(text, 'barCode')}
      />
      <AppImagePicker
        imageSourceType="prescription"
        visible={modalVisible}
        setImageUri={setUploadedImageName}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onPressCancel={() => setModalVisible(!modalVisible)}
        renderComponent={
          <AppButton
            label="Upload Prescription Image"
            color="dodgerblue"
            icon="upload"
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.pickerBtn}
          />
        }
      />
      <View style={styles.imgContainer}>
        <RenderImage
          image={downloadedImage}
          imageStyle={styles.image}
          containerStyle={downloadedImage ? styles.imageContainer : {}}
        />
      </View>
    </View>
  );
};

export default PrescriptionInfo;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 250,
    borderRadius: 10,
    alignSelf: 'center',
  },
  pickerBtn: {
    backgroundColor: colors.mainGrey,
    borderRadius: 5,
    height: 42,
    borderWidth: 1,
  },
  imgContainer: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 15,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 15,
    backgroundColor: colors.mediumGrey,
  },
});
