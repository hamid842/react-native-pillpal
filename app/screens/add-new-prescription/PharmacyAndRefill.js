import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import dayjs from 'dayjs';

import DatePicker from '../../components/DatePicker';
import SelectField from '../../components/SelectField';
import useApi from '../../hooks/useApi';
import pharmacies from '../../api/pharmacies';

const PharmacyAndRefill = ({data, handleChange}) => {
  const pharmaciesApi = useApi(pharmacies.getAllPharmacies);
  const [pharmaciesList, setPharmaciesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [pharmacyValue, setPharmacyValue] = useState(null);

  const getPharmacies = async () => {
    const result = await pharmaciesApi.request();
    if (result.ok) {
      setPharmaciesList(result.data);
    } else {
      return;
    }
  };

  useEffect(() => {
    getPharmacies();
  }, []);

  return (
    <ScrollView>
      <SelectField
        schema={{
          label: 'name',
          value: 'id',
        }}
        searchable={true}
        open={open}
        setOpen={setOpen}
        data={pharmaciesList}
        value={pharmacyValue}
        setValue={setPharmacyValue}
        placeholder="Select or Search Pharmacy"
      />
      <DatePicker
        label="Refill Time"
        value={data?.refillTime}
        onChange={date => handleChange(dayjs(date?.date), 'refillTime')}
      />
    </ScrollView>
  );
};

export default PharmacyAndRefill;
