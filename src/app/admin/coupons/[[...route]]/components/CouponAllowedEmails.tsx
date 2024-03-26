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
import { getUsers } from '@/api/admin/users/userAPI';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CouponAllowedEmails() {
    const {control, watch} = useFormContext()
    const [query, setQuery] = React.useState("")
    const [list, setList] = React.useState<any[]>([])
    const selected = watch('allowed_users')

    const get_users = useMutation({
      mutationFn: (data: string) => getUsers(data, "", "", 10, 0),
      onSuccess: (res)=> {
        setList(res.results)
      }
    })

    React.useEffect(()=>{
      get_users.mutate(query)
    }, [query])

  return (
    <Controller
    control={control}
    name={'allowed_users'}
    // rules={}
    render={({ field: { value, onChange, ...field } }) => {

      return ( <Autocomplete size='small'
      multiple
      onChange={(event, data)=>{
        onChange(data.sort((a, b) => a.id - b.id))
      }}
      value={value}

      options={list}
      loading={get_users.isPending}
      disableCloseOnSelect
      isOptionEqualToValue={(option, value)=>{
        return option.id == value.id
      }}
      getOptionLabel={(option) => option.email}
      renderOption={(props: any, option, { selected }) => {
        delete props.key;
        return <li key={option.id} {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.email}
        </li>
      }}
      fullWidth
      renderInput={(params) => (
        <TextField 
        placeholder={( selected.length == 0 ) ? 'No restrictions' : ''}
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
