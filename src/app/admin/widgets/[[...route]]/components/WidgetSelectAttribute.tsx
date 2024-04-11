import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {debounce} from '@mui/material/utils';
import { useMutation } from '@tanstack/react-query';
import { getAttributes } from '@/api/admin/attributes/attributeAPI';
import { Controller } from 'react-hook-form';


export default function WidgetSelectAttribute({control}: {control: any}) {
    const [query, setQuery] = React.useState("")
    const [list, setList] = React.useState<any[]>([])
    const get_attributes = useMutation({
      mutationFn: (data: any) => getAttributes(data, "", "", 10, 0),
      onSuccess: (res)=> {
        setList(res.results)
      }
    })

    React.useEffect(()=>{
      get_attributes.mutate(query)
    }, [query])

  return ( 
    <Controller
    control={control}
    name='attribute'
    render={({ field: { value, onChange, ...field } }) => {
        return (
            <Autocomplete size='small'
                onChange={(event, data)=>{
                    if(data == null)setQuery('')
                    onChange(data)
                }}
                value={value}
                options={list}
                loading={get_attributes.isPending}
                disableCloseOnSelect
                isOptionEqualToValue={(option, value)=>{
                    return option.id == value.id
                }}
                getOptionLabel={(option) => option.title}
                fullWidth
                sx={{width: 300}}
                renderInput={(params) => (
                    <TextField
                    label={'attribute'}
                    variant='standard'
                    {...params} 
                    onChange={debounce(e => {
                        setQuery(e.target.value)
                    }, 500)} 
                    onBlur={debounce(e => {
                        setQuery(e.target.value)
                    }, 500)}
                    />
                )}
                />
             )
        }
    }
  />
  );
}

