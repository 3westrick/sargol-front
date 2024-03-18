import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SimpleRadio({options, value, setValue, label}:{
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    label: string | null,
    options: any[]
}) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl fullWidth>
        {label && <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>}
        <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
        >
            {options.map((opt, index) => <FormControlLabel key={index} value={opt.value} control={<Radio />} label={opt.label} />)}
        </RadioGroup>
    </FormControl>
  );
}