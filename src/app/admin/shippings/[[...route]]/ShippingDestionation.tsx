import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function ShippingDestionation() {
  const [value, setValue] = React.useState('default-shipping-address');

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
        <FormControlLabel value="default-shipping-address" control={<Radio />} label="Default to customer shipping address" />
        <FormControlLabel value="default-billing-address" control={<Radio />} label="Default to customer billing address" />
        <FormControlLabel value="force-billing-address" control={<Radio />} label="Force shipping to the customer billing address" />
      </RadioGroup>
    </FormControl>
  );
}
