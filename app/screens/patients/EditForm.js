import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import dayjs from 'dayjs';

import Button from '../../components/AppButton';
import SelectField from '../../components/SelectField';
import AppTextInput from '../../components/AppTextInput';
import AppImagePicker from '../../components/AppImagePicker';
import AppButton from '../../components/AppButton';
import DatePicker from '../../components/DatePicker';
import colors from '../../config/colors';
import patientsApi from '../../api/patients';
import ActivityIndicator from '../../components/ActivityIndicator';
import SuccessSnackbar from '../../components/SuccessSnackbar';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import useApi from '../../hooks/useApi';
import images from '../../api/images';
import {getAllPatients} from '../../redux/reducers/patients/patients-reducer';
import RenderImage from '../../components/RenderImage';

const EditForm = props => {
  const imageDownloadApi = useApi(images.downloadImage);
  const {editMode, selectedPatient, setAddMode, setEditMode, account} = props;
  console.log('selected', selectedPatient);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState('');
  const [downloadedImage, setDownloadedImage] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [newPatientInfo, setNewPatientInfo] = useState({
    firstName: editMode ? selectedPatient?.firstName : '',
    lastName: editMode ? selectedPatient?.lastName : '',
    birthDate: editMode
      ? dayjs(selectedPatient?.birthDate).format('YYYY-MM-DD')
      : '',
    idNo: editMode ? selectedPatient?.idNo : '',
    address: editMode ? selectedPatient?.address : '',
    phoneNumber1: editMode ? selectedPatient?.phoneNumber1 : '',
    phoneNumber2: editMode ? selectedPatient?.phoneNumber2 : '',
    email: editMode ? selectedPatient?.email : '',
    height: editMode ? selectedPatient?.height.toString() : '',
    age: editMode ? selectedPatient?.age.toString() : '',
    weight: editMode ? selectedPatient?.weight.toString() : '',
    bloodType: editMode ? selectedPatient?.bloodType : '',
    maritalStatus: editMode ? selectedPatient?.maritalStatus : '',
    relationshipWithUser: editMode ? selectedPatient?.relationshipWithUser : '',
    patientImageUrl: editMode ? selectedPatient?.patientImageUrl : '',
    userInfo: {
      id: account?.id,
    },
  });

  const bloodTypeOptions = [
    {label: 'B+', value: 'B_p'},
    {label: 'A+', value: 'A_p'},
    {label: 'B-', value: 'B_n'},
    {label: 'A-', value: 'A_n'},
    {label: 'AB+', value: 'AB_p'},
    {label: 'AB-', value: 'AB_n'},
    {label: 'O+', value: 'O_p'},
    {label: 'O-', value: 'O_n'},
  ];

  const maritalStatusOptions = [
    {label: 'Married', value: 'MARRIED'},
    {label: 'Single', value: 'SINGLE'},
  ];

  useEffect(() => {
    setNewPatientInfo({...newPatientInfo, patientImageUrl: uploadedImageName});
    editMode &&
      newPatientInfo.patientImageUrl &&
      imageDownloadApi.request(
        newPatientInfo.patientImageUrl,
        setDownloadedImage,
      );
    uploadedImageName &&
      imageDownloadApi.request(uploadedImageName, setDownloadedImage);
  }, [uploadedImageName, newPatientInfo.patientImageUrl]);

  const handlePressCancel = () => {
    setAddMode(false);
    setEditMode(false);
  };

  const handleChange = (text, name) => {
    setNewPatientInfo({...newPatientInfo, [name]: text});
  };
  const handleEditPatient = async () => {
    setLoading(true);
    const result = await patientsApi.editPatient(
      selectedPatient?.id,
      newPatientInfo,
    );
    if (result.ok) {
      setLoading(false);
      setShowSuccessSnackbar(true);
      setEditMode(false);
      props.getAllPatients(account?.id);
    } else {
      setLoading(false);
      setShowErrorSnackbar(true);
    }
  };
  const handleCreatePatient = async () => {
    setLoading(true);
    const result = await patientsApi.createPatient(newPatientInfo);
    if (result.ok) {
      setLoading(false);
      setShowSuccessSnackbar(true);
      setAddMode(false);
      props.getAllPatients(account?.id);
    } else {
      console.log(result);
      setLoading(false);
      setShowErrorSnackbar(true);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading || imageDownloadApi.loading} />
      <AppTextInput
        label="First Name"
        value={newPatientInfo.firstName}
        onChange={text => handleChange(text, 'firstName')}
      />
      <AppTextInput
        label="Last Name"
        value={newPatientInfo.lastName}
        onChange={text => handleChange(text, 'lastName')}
      />
      <AppTextInput
        label="ID No."
        value={newPatientInfo.idNo}
        onChange={text => handleChange(text, 'idNo')}
      />
      {editMode ? (
        <AppTextInput
          label="ID No."
          value={dayjs(newPatientInfo.birthDate).format('YYYY-MM-DD')}
          onChange={text => handleChange(text, 'birthDate')}
        />
      ) : (
        <DatePicker
          label="Birth Date"
          value={newPatientInfo.birthDate}
          onChange={date => {
            handleChange(dayjs(date?.date).format('YYYY-MM-DD'), 'birthDate');
          }}
        />
      )}
      <AppTextInput
        label="Address"
        value={newPatientInfo.address}
        onChange={text => handleChange(text, 'address')}
      />
      <AppTextInput
        label="Email"
        value={newPatientInfo.email}
        onChange={text => handleChange(text, 'email')}
      />
      <AppTextInput
        keyboardType="numeric"
        label="Phone Number"
        value={newPatientInfo.phoneNumber1}
        onChange={text => handleChange(text, 'phoneNumber1')}
      />
      <AppTextInput
        keyboardType="numeric"
        label="Mobile Number"
        value={newPatientInfo.phoneNumber2}
        onChange={text => handleChange(text, 'phoneNumber2')}
      />
      <SelectField
        label="Marital Status"
        value={newPatientInfo.maritalStatus}
        data={maritalStatusOptions}
        onChange={text => handleChange(text, 'maritalStatus')}
      />
      <AppTextInput
        keyboardType="numeric"
        label="Age"
        value={newPatientInfo.age}
        right={<TextInput.Affix text="Years old" />}
        onChange={text => handleChange(text, 'age')}
      />
      <AppTextInput
        keyboardType="numeric"
        label="Height"
        value={newPatientInfo.height}
        right={<TextInput.Affix text="Cm" />}
        onChange={text => handleChange(text, 'height')}
      />
      <AppTextInput
        keyboardType="numeric"
        label="Weight"
        value={newPatientInfo.weight}
        right={<TextInput.Affix text="Kg" />}
        onChange={text => handleChange(text, 'weight')}
      />
      <SelectField
        label="Blood Type"
        value={newPatientInfo.bloodType}
        data={bloodTypeOptions}
        onChange={text => handleChange(text, 'bloodType')}
      />
      <AppTextInput
        label="Relationship"
        value={newPatientInfo.relationshipWithUser}
        onChange={text => handleChange(text, 'relationshipWithUser')}
      />
      <AppImagePicker
        imageSourceType="patient"
        visible={modalVisible}
        setImageUri={setUploadedImageName}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onPressCancel={() => setModalVisible(!modalVisible)}
        renderComponent={
          <AppButton
            label="Upload Patient Image"
            color="dodgerblue"
            icon="upload"
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.pickerBtn}
          />
        }
      />
      <View style={styles.imgContainer}>
        <RenderImage
          image={downloadedImage}
          imageStyle={styles.image}
          containerStyle={downloadedImage ? styles.imageContainer : {}}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          label="Cancel"
          color={colors.danger}
          icon="close"
          style={styles.btn}
          onPress={handlePressCancel}
        />
        <Button
          label="Save"
          color="green"
          icon="check"
          style={styles.btn}
          onPress={editMode ? handleEditPatient : handleCreatePatient}
        />
      </View>
      <SuccessSnackbar
        visible={showSuccessSnackbar}
        message="Patient Edited Successfully."
        onDismiss={() => setShowSuccessSnackbar(false)}
      />
      <ErrorSnackbar
        visible={showErrorSnackbar}
        message="Something went wrong!"
        onDismiss={() => setShowErrorSnackbar(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: 100,
  },
  pickerBtn: {
    backgroundColor: colors.mainGrey,
    borderRadius: 5,
    height: 42,
    borderWidth: 1,
  },
  selectedImage: {
    width: 100,
    height: 200,
    borderRadius: 20,
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

const mapStateToProps = ({login, patients}) => ({
  account: login.account,
  selectedPatient: patients.selectedPatient,
});

export default connect(mapStateToProps, {getAllPatients})(EditForm);
