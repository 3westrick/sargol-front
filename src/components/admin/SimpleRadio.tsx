import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SimpleRadio({options, label, value, onChange}:{
    label: string | null,
    options: any[],
    value: any,
    onChange: any
}) {

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue((event.target as HTMLInputElement).value);
  // };

  return (
    <FormControl fullWidth>
        {label && <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>}
        <RadioGroup
            value={value}
            onChange={onChange}
            aria-labelledby="demo-controlled-radio-buttons-group"
        >
            {options.map((opt, index) => <FormControlLabel key={index} value={opt.value} control={<Radio />} label={opt.label} />)}
        </RadioGroup>
    </FormControl>
  );
}