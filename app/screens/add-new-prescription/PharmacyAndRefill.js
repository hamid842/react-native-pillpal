import React from 'react';
import {View} from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import dayjs from 'dayjs';

import DatePicker from '../../components/DatePicker';

const PharmacyAndRefill = ({data, handleChange}) => {
  return (
    <View>
      <AppTextInput
        label="Pharmacy"
        value={data?.pharmacy}
        onChange={text => handleChange(text, 'pharmacy')}
      />
      <DatePicker
        label="Refill Time"
        value={data?.refillTime}
        onChange={date => handleChange(dayjs(date?.date), 'refillTime')}
      />
    </View>
  );
};

export default PharmacyAndRefill;
