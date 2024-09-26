import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { Country, State, City }  from 'country-state-city';


export default function StateSelectMultiple() {

  const {control, watch} = useFormContext()
  const country = watch('country')
  
  return (
    <Controller
    control={control}
    name={'states'}
    render={({ field: { value, onChange, ...field } }) => {
      return (
        <Autocomplete
          multiple
          id="country-select-demo"
          onChange={(event, data)=>{
            onChange(data)
          }}
          value={value}
          fullWidth
          options={country ? State.getStatesOfCountry(country.isoCode) : []}
          autoHighlight
          isOptionEqualToValue = {(option , value) => option.isoCode == value.isoCode}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose State(s)"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      );
    }}
    />
  )

}
