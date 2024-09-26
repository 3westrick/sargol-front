import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { Country, State, City }  from 'country-state-city';


export default function CitySelectMultiple() {

  const {control, watch} = useFormContext()
  const states = watch('states')
  let cities = []
  states.map((state) => {
    cities = cities.concat(City.getCitiesOfState(state.countryCode, state.isoCode))
  })

  // console.log(cities)

  
  
  return (
    <Controller
    control={control}
    name={'cities'}
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
          options={cities}
          autoHighlight
          isOptionEqualToValue = {(option , value) => option.name == value.name}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose City"
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
