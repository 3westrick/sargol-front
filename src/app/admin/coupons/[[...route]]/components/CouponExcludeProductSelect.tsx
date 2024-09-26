import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { debounce } from "@mui/material/utils"
import { useMutation } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';
import { getProductsCoupon } from '@/api/admin/products/productAPI';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CouponExcludeProductSelect() {
    const {control, watch} = useFormContext()
    const [query, setQuery] = React.useState("")
    const [list, setList] = React.useState<any[]>([])
    const selected = watch('exclude_products')
    const get_categories = useMutation({
      mutationFn: (data: string) => getProductsCoupon(data),
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
    name={'exclude_products'}
    // rules={}
    render={({ field: { value, onChange, ...field } }) => {

      return ( <Autocomplete size='small'
      multiple
      onChange={(event, data)=>{
        onChange(data.sort((a, b) => a.id - b.id))
      }}
      value={value}

      options={list}
      loading={get_categories.isPending}
      disableCloseOnSelect
      isOptionEqualToValue={(option, value)=>{
        return option.id == value.id
      }}
      getOptionLabel={(option) => option.title}
      renderOption={(props: any, option, { selected }) => {
        delete props.key;
        return <li key={option.id} {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      }}
      fullWidth
      renderInput={(params) => (
        <TextField 
        placeholder={( selected.length == 0 ) ? 'Search for a product...' : ''}
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
