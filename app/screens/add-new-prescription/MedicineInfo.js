import React, {useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import AppTextInput from '../../components/AppTextInput';

import AppImagePicker from '../../components/AppImagePicker';
import SelectField from '../../components/SelectField';
import CronModal from './CronModal';
import colors from '../../config/colors';

const MedicineInfo = ({data, handleChange, setImageUri, medicImageUrl}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
      <AppImagePicker
        state="medicImageUrl"
        setImageUri={setImageUri}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onPressCancel={() => setModalVisible(!modalVisible)}
        renderComponent={
          <AppButton
            label="Upload Medicine Image"
            color="dodgerblue"
            icon="upload"
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.pickerBtn}
          />
        }
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
  pickerBtn: {
    backgroundColor: colors.mainGrey,
    borderRadius: 5,
    height: 42,
    borderWidth: 1,
  },
});
