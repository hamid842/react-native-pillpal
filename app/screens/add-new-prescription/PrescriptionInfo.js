import React, {useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import dayjs from 'dayjs';

import DatePicker from '../../components/DatePicker';
import AppImagePicker from '../../components/AppImagePicker';
import AppButton from '../../components/AppButton';
import colors from '../../config/colors';

const PrescriptionInfo = ({
  data,
  handleChange,
  setImageUri,
  prescriptionImageUrl,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <DatePicker
        label="Promised"
        value={data?.issueDate}
        onChange={date => handleChange(dayjs(date?.date), 'issueDate')}
      />
      <AppTextInput
        label="Barcode"
        value={data?.barCode}
        onChange={text => handleChange(text, 'barCode')}
      />
      <AppImagePicker
        state="prescriptionImageUrl"
        setImageUri={setImageUri}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onPressCancel={() => setModalVisible(!modalVisible)}
        renderComponent={
          <AppButton
            label="Upload Prescription Image"
            color="dodgerblue"
            icon="upload"
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.pickerBtn}
          />
        }
      />
      {prescriptionImageUrl && (
        <Image source={{uri: prescriptionImageUrl}} style={styles.image} />
      )}
    </View>
  );
};

export default PrescriptionInfo;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 250,
    borderRadius: 10,
    alignSelf: 'center',
  },
  pickerBtn: {
    backgroundColor: colors.mainGrey,
    borderRadius: 5,
    height: 42,
    borderWidth: 1,
  },
});
