import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function TaxEnterPrice() {
  const [value, setValue] = React.useState('true');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="true" control={<Radio />} label="Yes, I will enter prices inclusive of tax" />
        <FormControlLabel value="false" control={<Radio />} label="No, I will enter prices exclusive of tax" />
      </RadioGroup>
    </FormControl>
  );
}
