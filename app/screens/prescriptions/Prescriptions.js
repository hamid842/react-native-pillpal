import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {connect} from 'react-redux';

import Header from '../../layout/Header';
import NoPatient from './NoPatient';
import PatientAccordion from './PatientAccordion';

const Prescriptions = ({navigation, patients}) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <>
      <Header navigation={navigation} title={'Prescriptions'} />
      <ScrollView>
        <List.Section title="Patients" style={styles.accordion}>
          {patients && patients.length > 0 ? (
            patients.map((patient, i) => (
              <PatientAccordion
                key={i}
                patient={patient}
                navigation={navigation}
              />
            ))
          ) : (
            <NoPatient navigation={navigation} />
          )}
        </List.Section>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  accordion: {
    marginHorizontal: 10,
  },
});

const mapStateToProps = ({patients}) => ({
  patients: patients.patients,
});

export default connect(mapStateToProps, {})(Prescriptions);
