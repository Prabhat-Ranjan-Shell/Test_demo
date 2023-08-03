import { useState } from 'react';
import dayjs from 'dayjs';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const getBackDate = (c) => {
  switch(c) {
    case "Last Month":
      return new Date(new Date().setDate(new Date().getDate() - 30));
    case "Last 3 Months":
      return new Date(new Date().setDate(new Date().getDate() - 90));
    case "Last 6 Months":
      return new Date(new Date().setDate(new Date().getDate() - 180));
    case "Last 1 Year": 
      return new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  }

  return new Date(new Date().setDate(new Date().getDate() - 30));
}

export default function FirstComponent() {
  const [value1, setValue1] = useState(dayjs(getBackDate("Last Month").toLocaleDateString()));
  const [value2, setValue2] = useState(dayjs(new Date().toLocaleDateString()));
  const [customDate, setCustomDate] = useState('Last Month');

  const handleChange = (event) => {
    setCustomDate(event.target.value);
    setValue1(dayjs(getBackDate(event.target.value).toLocaleDateString()));
  };

  console.log("date values 1: ", new Date(value1).toLocaleDateString());
  console.log("date values 2: ", new Date(value2).toLocaleDateString());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Select start date"
          value={value1}
          onChange={(newValue) => setValue1(newValue)}
        />
        <DatePicker
          label="Select end date"
          value={value2}
          onChange={(newValue) => setValue2(newValue)}
        /><FormControl sx={{ m: 1, minWidth: 150 }} size="large">
        <InputLabel id="demo-select-small-label">Custom range</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={customDate}
          label="Custom range"
          onChange={handleChange}
        >
          <MenuItem value="Last Month">Last Month</MenuItem>
          <MenuItem value="Last 3 Months">Last 3 Months</MenuItem>
          <MenuItem value="Last 6 Months">Last 6 months</MenuItem>
          <MenuItem value="Last 1 Year">Last 1 Year</MenuItem>
        </Select>
      </FormControl>
      </DemoContainer>
    </LocalizationProvider>
  );
}