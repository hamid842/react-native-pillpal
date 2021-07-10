import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import AppTextInput from '../../components/AppTextInput';

import ImagePicker from '../../components/ImagePicker';
import SelectField from '../../components/SelectField';
import CronModal from './CronModal';

const MedicineInfo = ({data, handleChange, setImageUri, medicImageUrl}) => {
  const medicTypes = [
    {label: 'OTHER', value: 'OTHER'},
    {label: 'ORAL', value: 'ORAL'},
    {label: 'INJECTION', value: 'INJECTION'},
  ];
  return (
    <View>
      <AppTextInput
        label="Generic Name"
        value={data?.genericName}
        onChange={text => handleChange(text, 'genericName')}
      />
      <SelectField
        label="Type"
        data={medicTypes}
        value={data?.medicType}
        onChange={text => handleChange(text, 'medicType')}
      />
      <AppTextInput
        label="Usage Description"
        value={data?.usageDescription}
        onChange={text => handleChange(text, 'usageDescription')}
      />
      <ImagePicker
        state="medicImageUrl"
        label="Upload Medication Image"
        setImageUri={setImageUri}
      />
      <CronModal handleChange={handleChange} />
      {medicImageUrl && (
        <Image source={{uri: medicImageUrl}} style={styles.image} />
      )}
    </View>
  );
};

export default MedicineInfo;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 250,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
