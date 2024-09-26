import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {debounce} from '@mui/material/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllAttributes, getAttributes } from '@/api/admin/attributes/attributeAPI';
import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


export default function WidgetSelectAttribute({control}: {control: any}) {

    const attributes_query = useQuery({
      queryKey: ['admin-attributes', 'all'],
      queryFn: () => getAllAttributes()
    })


  return ( 
    <FormControl variant='standard' size="small">
      <InputLabel id="demo-simple-select-label">Attribute</InputLabel>
        <Controller
        control={control}
        name={'attribute'}
        // rules={{ required: "Recipe picture is required" }}
        render={({ field: { value, onChange, ...field } }) => {
        return (
            <Select
            sx={{width:'195px'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={'Attribute'}
            value={value}
            onChange={(event)=> onChange(event.target.value)}
            >
                {
                attributes_query.data.map((att:any, index: number) => (
                    <MenuItem key={att.id} value={att.id}>{att.title}</MenuItem>
                ))
                }
                </Select>
                )
            }
        }
      /> 
    </FormControl>
  );
}

