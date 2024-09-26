import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';

const SimpleSelect = ({options, label}:{
    options: any[], label: string
}) => {

    const  { control } = useFormContext()

    return (
        <FormControl fullWidth size="small">
          <Controller
            control={control}
            name={label}
            // rules={{ required: "Recipe picture is required" }}
            render={({ field: { value, onChange } }) => {
              return (
                <Select
                  value={value}
                  onChange={(event)=> onChange(event.target.value)}
                >
                  {options.map((opt, index) => (
                    <MenuItem key={index} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
                )
            }
          }
          />
      </FormControl>
    )
}

export default SimpleSelect
