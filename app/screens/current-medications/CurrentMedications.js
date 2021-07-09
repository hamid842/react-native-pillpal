import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import Screen from '../../components/Screen';
import Header from '../../layout/Header';
import prescriptionsApi from '../../api/prescriptions';
import CurrentMedicItem from './CurrentMedicItem';
import ActivityIndicator from '../../components/ActivityIndicator';
import colors from '../../config/colors';
import NoPrescription from './NoPrescription';

const CurrentMedications = ({navigation, selectedPatientFromTopMenu}) => {
  const carousel = useRef();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCurrentMedications = async id => {
    if (id) {
      setLoading(true);
      const result = await prescriptionsApi.getPatientPrescriptions(id);
      if (result.ok) {
        setLoading(false);
        setPrescriptions(result.data);
      } else {
        setLoading(false);
      }
    }
  };

  const renderItem = ({item, index}) => {
    return <CurrentMedicItem item={item} />;
  };

  useEffect(() => {
    selectedPatientFromTopMenu &&
      fetchCurrentMedications(selectedPatientFromTopMenu?.id);
  }, [selectedPatientFromTopMenu?.id]);
  return (
    <Screen>
      <ActivityIndicator visible={loading} />
      <Header navigation={navigation} title={'Current Medications'} />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Current Medications of{' '}
          <Text style={styles.name}>
            {selectedPatientFromTopMenu?.firstName}
          </Text>
        </Text>
      </View>
      {prescriptions.length > 0 ? (
        <Carousel
          layout={'tinder'}
          ref={c => {
            carousel == c;
          }}
          data={prescriptions}
          renderItem={renderItem}
          sliderWidth={380}
          itemWidth={400}
          style={{backgroundColor: 'yellow'}}
        />
      ) : (
        <NoPrescription navigation={navigation} />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    color: colors.darkBlue,
    fontStyle: 'italic',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

const mapStateToProps = ({patients}) => ({
  selectedPatientFromTopMenu: patients.selectedPatientFromTopMenu,
});

export default connect(mapStateToProps, {})(CurrentMedications);
