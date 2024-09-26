import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useQuery } from '@tanstack/react-query';
import { getShippingOptions } from '@/api/admin/optionApi';

export default function ShippingCalculations() {

  const {data:shipping_options} = useQuery({
      queryKey: ['admin-options-shippings'],
      queryFn: () => getShippingOptions(),
  })
  const calculation_option = shipping_options.find((item:any) => item.title == 'shipping_calculations')
  const [value, setValue] = React.useState(calculation_option.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="show" control={<Radio />} label="Enable the shipping calculator on the basket page" />
        <FormControlLabel value="hide" control={<Radio />} label="Hide shipping costs until an address is entered" />
      </RadioGroup>
    </FormControl>
  );
}
