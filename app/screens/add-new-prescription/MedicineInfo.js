import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import AppTextInput from '../../components/AppTextInput';
import SelectField from '../../components/SelectField';
import CronModal from './CronModal';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi';
import medicines from '../../api/medicines';

const MedicineInfo = ({data, handleChange}) => {
  const medicinesApi = useApi(medicines.getAllMedicines);
  const [medicinesList, setMedicinesList] = useState([]);
  const [openType, setOpenType] = useState(false);
  const [openMedicine, setOpenMedicine] = useState(false);
  const [medicValue, setMedicValue] = useState(null);
  const [medicType, setMedicType] = useState(null);

  const medicTypes = [
    {label: 'OTHER', value: 'OTHER'},
    {label: 'ORAL', value: 'ORAL'},
    {label: 'INJECTION', value: 'INJECTION'},
  ];

  const getMedicines = async id => {
    const result = await medicinesApi.request(id);
    if (result.ok) {
      setMedicinesList([result.data]);
    } else {
      return;
    }
  };

  useEffect(() => {
    getMedicines(1);
  }, []);

  useEffect(() => {
    const medicine = medicinesList?.find(
      medicine => medicine.id === medicValue,
    );
    handleChange(medicine, 'medicine');
  }, [medicValue]);

  useEffect(() => {
    handleChange(medicType, 'medicType');
  }, [medicType]);

  return (
    <View>
      <SelectField
        schema={{
          label: 'brandName',
          value: 'id',
        }}
        searchable={true}
        open={openMedicine}
        setOpen={setOpenMedicine}
        data={medicinesList}
        value={medicValue}
        setValue={setMedicValue}
        placeholder="Select or Search Medicine"
      />
      <SelectField
        open={openType}
        setOpen={setOpenType}
        data={medicTypes}
        value={medicType}
        setValue={setMedicType}
        placeholder="Medicine Type"
      />
      <AppTextInput
        label="Usage Description"
        value={data?.usageDescription}
        onChange={text => handleChange(text, 'usageDescription')}
      />

      <CronModal handleChange={handleChange} />
      <View style={{height: 240}}></View>
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
  dropdown: {
    height: 40,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'dodgerblue',
    borderRadius: 5,
  },
  itemStyle: {
    padding: 5,
    marginTop: 2,
    backgroundColor: colors.mediumGrey,
    borderColor: colors.mediumGrey,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
