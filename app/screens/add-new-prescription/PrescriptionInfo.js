import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import dayjs from 'dayjs';

import DatePicker from '../../components/DatePicker';
import ImagePicker from '../../components/ImagePicker';

const PrescriptionInfo = ({
  data,
  handleChange,
  setImageUri,
  prescriptionImageUrl,
}) => {
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
      <ImagePicker
        state="prescriptionImageUrl"
        label="Upload Prescription Image"
        setImageUri={setImageUri}
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
});
