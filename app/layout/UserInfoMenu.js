import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  Modal,
  Text,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Screen from '../components/Screen';
import colors from '../config/colors';
import auth from '../auth/useAuth';
import {
  getAllPatients,
  selectPatientFromTopMenu,
} from '../redux/reducers/patients/patients-resucer';
import PatientListItem from './PatientListItem';
import useAuth from '../auth/useAuth';

const UserInfoMenu = props => {
  const auth = useAuth();
  const {account, selectedPatientFromTopMenu, patients} = props;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    props.getAllPatients(account?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.id]);

  // const handleSelectPatient = id => {
  //   props.selectPatientFromTopMenu(id);
  // };
  console.log('Patient', patients);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.btn}>
          <Image source={require('../assets/hamid.png')} style={styles.image} />
          <Icon name="chevron-down" size={25} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.centeredView}>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity
            onPressOut={() => setModalVisible(false)}
            style={styles.centeredView}>
            <View style={styles.modalView}>
              <List.Accordion
                style={{backgroundColor: colors.mainGrey}}
                title="Patients"
                left={props => <List.Icon {...props} icon="account-group" />}>
                <List.Section title="">
                  {patients.length > 0 &&
                    patients.map((patient, i) => (
                      <PatientListItem key={i} patient={patient} />
                    ))}
                </List.Section>
              </List.Accordion>
              <List.Item
                title="Logout"
                left={props => <List.Icon {...props} icon="logout-variant" />}
                onPress={() => auth.logOut()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    marginTop: 50,
    backgroundColor: colors.mainGrey,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const mapStateToProps = ({login, patients}) => ({
  patients: patients.patients,
  selectedPatientFromTopMenu: patients.selectedPatientFromTopMenu,
  account: login.account,
});

export default connect(mapStateToProps, {
  getAllPatients,
  selectPatientFromTopMenu,
})(UserInfoMenu);
