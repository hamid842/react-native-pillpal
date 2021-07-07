import React from 'react';
import {DatePickerModal} from 'react-native-paper-dates';
import dayjs from 'dayjs';

import AppTextInput from './AppTextInput';

const DatePicker = ({value, onChange}) => {
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );

  return (
    <>
      <AppTextInput
        label="Birth Date"
        value={dayjs(date).format('YYYY-MM-DD')}
        onFocus={() => setOpen(true)}
      />
      <DatePickerModal
        inputFormat="yyyy-MM-dd"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        validRange={{
          startDate: new Date(1970, 1, 1),
          endDate: new Date(),
        }}
        onChange={onChange}
        saveLabel="Pick"
        label="Select date"
      />
    </>
  );
};
export default DatePicker;
