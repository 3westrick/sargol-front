import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CustomSelect({value, setValue, options, label, optionKey, optionValue, optionName, defaultOption}:{
    value: string, 
    // setValue: React.Dispatch<React.SetStateAction<string>>,
    setValue: any,
    options: any[], label: string, optionKey: string, optionValue: string, optionName: string,
    defaultOption: string | null| undefined
}) {

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={handleChange}
        >
          {defaultOption ? <MenuItem>{defaultOption}</MenuItem>
          :<MenuItem value={''}>None</MenuItem>
          }
          
          {options.map(option => (
            <MenuItem key={option[optionKey]} value={option[optionValue]}>{option[optionName]}</MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}