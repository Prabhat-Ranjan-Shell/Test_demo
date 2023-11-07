import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FirstComponent({
  value1,
  value2,
  customDate,
  setValue1,
  setValue2,
  setCustomDate,
  handleChange,
  disableCal,
}) {
  // const [value1, setValue1] = useState(dayjs(getBackDate("Last Month").toLocaleDateString()));
  // const [value2, setValue2] = useState(dayjs(new Date().toLocaleDateString()));
  // const [customDate, setCustomDate] = useState('Last Month');

  // const handleChange = (event) => {
  //   setCustomDate(event.target.value);
  //   setValue1(dayjs(getBackDate(event.target.value).toLocaleDateString()));
  // };

  // console.log("date values 1: ", new Date(value1).toLocaleDateString());
  // console.log("date values 2: ", new Date(value2).toLocaleDateString());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Select start date"
          value={value1}
          onChange={setValue1}
          disabled={disableCal}
        />
        <DatePicker
          label="Select end date"
          value={value2}
          onChange={setValue2}
          disabled={disableCal}
        />

        <FormControl sx={{ m: 1, minWidth: 150 }} size="large">
          <InputLabel id="demo-select-small-label">Custom range</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={customDate}
            label="Custom range"
            onChange={handleChange}
          >
            <MenuItem value="Custom range">Custom range</MenuItem>
            <MenuItem value="Month to date">Month to date</MenuItem>
            <MenuItem value="Last Month">Last Month</MenuItem>
            <MenuItem value="Last 3 Months">Last 3 Months</MenuItem>
            <MenuItem value="Last 6 Months">Last 6 months</MenuItem>
            <MenuItem value="Year to date">Year to date</MenuItem>
          </Select>
        </FormControl>
      </DemoContainer>
    </LocalizationProvider>
  );
}