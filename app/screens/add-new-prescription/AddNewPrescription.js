import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../layout/Header';
import PrescriptionInfo from './PrescriptionInfo';
import colors from '../../config/colors';
import MedicineInfo from './MedicineInfo';
import PharmacyAndRefill from './PharmacyAndRefill';
import ActivityIndicator from '../../components/ActivityIndicator';
import prescriptionsApi from '../../api/prescriptions';

class AddNewPrescription extends Component {
  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
    },
  };

  state = {
    issueDate: new Date(),
    hasRefill: false,
    importantInfo: '',
    barCode: '',
    qty: '1',
    prescriptionImageUrl: null,
    medicine: {},
    medicType: '',
    usageDescription: '',
    cron: '',
    pharmacy: {},
    loading: false,
    refillTime: new Date(),
    patientInfo: this.props.selectedPatientFromTopMenu,
    status: 'ACTIVE',
  };

  handleChange = (text, name) => {
    this.setState({...this.state, [name]: text});
  };

  setImageUri = (uri, name) => {
    this.setState({...this.state, [name]: uri});
  };

  handleSubmit = async () => {
    this.setState({...this.state, loading: true});
    const result = await prescriptionsApi.createNewPrescription(this.state);
    if (result.ok) {
      this.setState({...this.state, loading: false});
      alert('Prescription created.');
    } else {
      this.setState({...this.state, loading: false});
      alert('error');
    }
  };

  render() {
    return (
      <>
        <ActivityIndicator visible={this.state.loading} />
        <Header
          title="Add New Prescription"
          navigation={this.props.navigation}
        />
        <View style={styles.warning}>
          <View>
            <Icon name="alert-rhombus-outline" size={40} color="gray" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              You are adding a new prescription for
              <Text style={styles.name}>
                {' '}
                {this.props.selectedPatientFromTopMenu?.firstName}{' '}
                {this.props.selectedPatientFromTopMenu?.lastName}.
              </Text>
              If you want to add for another patient, please select from top
              menu.
            </Text>
          </View>
        </View>
        <ScrollView style={{flex: 1}} nestedScrollEnabled={true}>
          <ProgressSteps
            borderWidth={3}
            activeStepIconBorderColor={colors.mainBlue}
            activeStepNumColor={colors.mainBlue}
            completedProgressBarColor={colors.mainBlue}
            completedStepIconColor={colors.mainBlue}
            activeLabelColor={colors.mainBlue}
            disabledStepNumColor={colors.white}>
            <ProgressStep
              label="Prescription Info"
              nextBtnStyle={styles.nextBtnStyle}
              nextBtnTextStyle={styles.nextBtnTextStyle}
              scrollViewProps={this.defaultScrollViewProps}>
              <PrescriptionInfo
                data={this.state}
                prescriptionImageUrl={this.state.prescriptionImageUrl}
                handleChange={this.handleChange}
                setImageUri={this.setImageUri}
              />
            </ProgressStep>
            <ProgressStep
              label="Medication Info"
              previousBtnText="Back"
              nextBtnStyle={styles.nextBtnStyle}
              nextBtnTextStyle={styles.nextBtnTextStyle}
              previousBtnStyle={styles.nextBtnStyle}
              previousBtnTextStyle={styles.nextBtnTextStyle}
              scrollViewProps={this.defaultScrollViewProps}>
              <MedicineInfo
                data={this.state}
                handleChange={this.handleChange}
                setImageUri={this.setImageUri}
                medicImageUrl={this.state.medicImageUrl}
              />
            </ProgressStep>
            <ProgressStep
              label="Pharmacy & Refill"
              finishBtnText="Finish"
              previousBtnText="Back"
              nextBtnStyle={styles.nextBtnStyle}
              nextBtnTextStyle={styles.nextBtnTextStyle}
              previousBtnStyle={styles.nextBtnStyle}
              previousBtnTextStyle={styles.nextBtnTextStyle}
              scrollViewProps={this.defaultScrollViewProps}
              onSubmit={this.handleSubmit}>
              <PharmacyAndRefill
                data={this.state}
                handleChange={this.handleChange}
              />
            </ProgressStep>
          </ProgressSteps>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  nextBtnStyle: {
    borderWidth: 1,
    borderColor: colors.mainBlue,
    borderRadius: 25,
    width: 90,
    alignItems: 'center',
  },
  nextBtnTextStyle: {
    color: colors.mainBlue,
  },
  name: {
    color: colors.mainBlue,
    fontWeight: 'bold',
  },
  text: {
    color: 'gray',
  },
  textContainer: {
    marginLeft: 10,
    maxWidth: 300,
    color: colors.mainGrey,
  },
  warning: {
    backgroundColor: '#f9ca24',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const mapStateToProps = ({patients}) => ({
  selectedPatientFromTopMenu: patients.selectedPatientFromTopMenu,
});

export default connect(mapStateToProps, {})(AddNewPrescription);
