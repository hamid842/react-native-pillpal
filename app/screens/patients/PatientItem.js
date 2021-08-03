import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';

import Actions from './Actions';
import colors from '../../config/colors';
import GeneralInfo from './GeneralInfo';
import RenderImage from '../../components/RenderImage';
import useApi from '../../hooks/useApi';
import images from '../../api/images';

const PatientItem = props => {
  const imageDownloadApi = useApi(images.downloadImage);
  const {patient, setEditMode, onDeletePress} = props;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [downloadedImage, setDownloadedImage] = useState('');

  useEffect(() => {
    patient?.patientImageUrl &&
      imageDownloadApi.request(patient?.patientImageUrl, setDownloadedImage);
  }, [patient?.patientImageUrl]);

  return (
    <Card style={styles.card}>
      <Card.Title
        title={`${patient?.firstName} ${patient?.lastName}`}
        subtitle={`Age:${patient?.age}`}
        left={props => (
          <RenderImage
            {...props}
            image={downloadedImage}
            imageStyle={styles.image}
            containerStyle={styles.imageContainer}
          />
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

export default PatientItem;
