import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import colors from '../../config/colors';

import Header from '../../layout/Header';
import PrescriptionInfo from './PrescriptionInfo';
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
    barCode: '',
    prescriptionImageUrl: null,
    medicImageUrl: null,
    genericName: '',
    medicType: '',
    usageDescription: '',
    cron: '',
    pharmacy: '',
    refillTime: new Date(),
    loading: false,
  };

  handleChange = (text, name) => {
    console.log(this.state);
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
        <View style={{flex: 1}}>
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
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  nextBtnStyle: {
    borderWidth: 1,
    borderColor: colors.mainBlue,
    borderRadius: 25,
    width: 80,
    alignItems: 'center',
  },
  nextBtnTextStyle: {
    color: colors.mainBlue,
  },
});

export default AddNewPrescription;
