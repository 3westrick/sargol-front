import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { Controller, useFormContext } from 'react-hook-form';

export default function CustomeSwitch() {
  const {control} = useFormContext()

  return (
    <FormControl component="fieldset" variant="standard">
      <FormGroup>
        <Controller
        control={control}
        name='show'
        render={({field: {value, onChange}}) => {
          return (
            <FormControlLabel
            control={
              <Switch checked={value} onChange={(e) => onChange(e.target.checked)} name="gilad" />
            }
            label="Show ‘Apply filters’ button"
          />
          )
        }}
        />
      </FormGroup>
      <FormHelperText>Products will only update when the button is clicked.</FormHelperText>
    </FormControl>
  );
}