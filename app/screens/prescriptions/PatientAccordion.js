import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {List, Avatar} from 'react-native-paper';

import prescriptionsApi from '../../api/prescriptions';
import ActivityIndicator from '../../components/ActivityIndicator';
import PrescriptionStatus from './PrescriptionStatus';
import PrescriptionItem from './PrescriptionItem';
import NoPrescription from './NoPrescription';

const PatientAccordion = ({navigation, patient}) => {
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
  return (
    <>
      <ActivityIndicator visible={loading} />
      <List.Accordion
        title={`${patient?.firstName} ${patient?.lastName}`}
        description={`Age:${patient?.age}`}
        left={props => (
          <Avatar.Image
            {...props}
            size={40}
            source={require('../../assets/hamid.png')}
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
});

export default PatientAccordion;
