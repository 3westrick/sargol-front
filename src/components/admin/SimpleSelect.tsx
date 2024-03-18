import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react'

const SimpleSelect = ({register, options, label}:{
    register: any,
    options: any[], label: string
}) => {
  

    // const handleChange = (event: SelectChangeEvent) => {
    //   onChange(event.target.value as string);
    //   };
    
    return (
        <FormControl {...register} fullWidth size="small">
        <Select
          // value={value}
        //   label={label}
          // onChange={handleChange}

        >
          {options.map((opt, index) => (
            <MenuItem key={index} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
}

export default SimpleSelect
