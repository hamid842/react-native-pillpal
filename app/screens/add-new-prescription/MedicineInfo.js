import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View} from 'react-native';

import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import AppImagePicker from '../../components/AppImagePicker';
import SelectField from '../../components/SelectField';
import CronModal from './CronModal';
import RenderImage from '../../components/RenderImage';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi';
import images from '../../api/images';

const MedicineInfo = ({data, handleChange, setImageUri, medicImageUrl}) => {
  const imageDownloadApi = useApi(images.downloadImage);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState('');
  const [downloadedImage, setDownloadedImage] = useState('');
  const medicTypes = [
    {label: 'OTHER', value: 'OTHER'},
    {label: 'ORAL', value: 'ORAL'},
    {label: 'INJECTION', value: 'INJECTION'},
  ];

  useEffect(() => {
    uploadedImageName &&
      imageDownloadApi.request(uploadedImageName, setDownloadedImage);
  }, [uploadedImageName]);

  return (
    <View>
      <AppTextInput
        label="Generic Name"
        value={data?.genericName}
        onChange={text => handleChange(text, 'genericName')}
      />
      <SelectField
        label="Type"
        data={medicTypes}
        value={data?.medicType}
        onChange={text => handleChange(text, 'medicType')}
      />
      <AppTextInput
        label="Usage Description"
        value={data?.usageDescription}
        onChange={text => handleChange(text, 'usageDescription')}
      />
      <AppImagePicker
        imageSourceType="medication"
        visible={modalVisible}
        setImageUri={setUploadedImageName}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onPressCancel={() => setModalVisible(!modalVisible)}
        renderComponent={
          <AppButton
            label="Upload Medication Image"
            color="dodgerblue"
            icon="upload"
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.pickerBtn}
          />
        }
      />
      <CronModal handleChange={handleChange} />
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

export default MedicineInfo;

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
