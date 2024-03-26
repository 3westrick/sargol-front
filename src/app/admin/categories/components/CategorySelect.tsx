import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { debounce } from "@mui/material/utils"
import { getCategories } from '@/api/admin/categories/categoryAPI';
import { useMutation } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CategorySelect() {
    const {control} = useFormContext()
    const [query, setQuery] = React.useState("")
    const [list, setList] = React.useState<any[]>([])
    const get_categories = useMutation({
      mutationFn: (data: string) => getCategories(data, "", "", 10, 0),
      onSuccess: (res)=> {
        setList(res.results)
      }
    })

    React.useEffect(()=>{
      get_categories.mutate(query)
    }, [query])

  return (
    <Controller
    control={control}
    name={'parent'}
    // rules={}
    render={({ field: { value, onChange, ...field } }) => {
      return ( <Autocomplete size='small'
      onChange={(event, data)=>{
        // setQuery(data.title)
        if(!data)setQuery('')
        onChange(data)
      }}
      value={value}

      options={list}
      loading={get_categories.isPending}
      isOptionEqualToValue={(option, value)=>{
        return option.id == (value?.id)
      }}
      getOptionLabel={(option) => {
        return option.title ?? ''
      }}
      fullWidth
      renderInput={(params) => (
        <TextField 
        label={'Parent'}
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
    }}
    />
    
  );
  
}
