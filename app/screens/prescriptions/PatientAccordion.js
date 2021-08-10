import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {List, Avatar} from 'react-native-paper';

import prescriptionsApi from '../../api/prescriptions';
import ActivityIndicator from '../../components/ActivityIndicator';
import PrescriptionStatus from './PrescriptionStatus';
import PrescriptionItem from './PrescriptionItem';
import NoPrescription from './NoPrescription';
import RenderImage from '../../components/RenderImage';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi';
import images from '../../api/images';

const PatientAccordion = ({navigation, patient}) => {
  const imagesApi = useApi(images.downloadImage);
  const [downloadedImage, setDownloadedImage] = useState();
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionStatus, setPrescriptionStatus] = useState('ACTIVE');
  const [loading, setLoading] = useState(false);

  const fetchPatientPrescriptions = async id => {
    setLoading(true);
    const result = await prescriptionsApi.getPatientPrescriptions(id);
    if (result.ok) {
      setLoading(false);
      setPrescriptions(result.data);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    patient && fetchPatientPrescriptions(patient?.id);
  }, [patient]);

  useEffect(() => {
    patient?.patientImageUrl &&
      imagesApi.request(patient?.patientImageUrl, setDownloadedImage);
  }, [patient?.patientImageUrl]);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <List.Accordion
        title={`${patient?.firstName} ${patient?.lastName}`}
        description={`Age:${patient?.age}`}
        left={props => (
          <RenderImage
            image={downloadedImage}
            imageStyle={styles.image}
            containerStyle={styles.imageContainer}
          />
        )}
        style={styles.items}>
        <PrescriptionStatus
          value={prescriptionStatus}
          onValueChange={value => setPrescriptionStatus(value)}
        />
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription, i) => (
            <PrescriptionItem key={i} prescription={prescription} />
          ))
        ) : (
          <NoPrescription navigation={navigation} />
        )}
      </List.Accordion>
    </>
  );
};

const styles = StyleSheet.create({
  items: {
    borderRadius: 10,
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

export default PatientAccordion;
