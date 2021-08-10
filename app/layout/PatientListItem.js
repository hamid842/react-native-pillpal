import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';

import RenderImage from '../components/RenderImage';
import colors from '../config/colors';
import useApi from '../hooks/useApi';
import images from '../api/images';

const PatientListItem = ({patient, onPress}) => {
  const imagesApi = useApi(images.downloadImage);
  const [downloadedImage, setDownloadedImage] = useState();

  useEffect(() => {
    patient?.patientImageUrl &&
      imagesApi.request(patient?.patientImageUrl, setDownloadedImage);
  }, [patient?.patientImageUrl]);

  return (
    <List.Item
      title={`${patient?.firstName} ${patient.lastName}`}
      description={`Age: ${patient?.age}`}
      left={props => (
        <RenderImage
          image={downloadedImage}
          imageStyle={styles.image}
          containerStyle={styles.imageContainer}
        />
      )}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.mediumGrey,
  },
});

export default PatientListItem;
