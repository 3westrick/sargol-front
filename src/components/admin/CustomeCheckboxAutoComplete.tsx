import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useFormContext } from 'react-hook-form';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CustomeCheckboxAutoComplete({ items, itemKey, itemValue, itemLable, label, l,onChange,value }: {
    l: string,
    items: any[],
    onChange: any,
    value: any,
    itemKey: string, itemValue: string, itemLable: string, label: string,
}) {

    const methods = useFormContext()

    const { register, getValues } = methods
    // console.log(value)
    // const [count, setCount] = React.useState(0)
    return (
        <Autocomplete
            fullWidth
            multiple
            {...register(l)}
            onChange={(event, data) => {
                onChange(data)
            }}
            value={value}
            
            id="checkboxes-tags-demo"
            options={items}
            disableCloseOnSelect
            isOptionEqualToValue={(option, value)=>{
                return option.id == value.id
            }}
            getOptionLabel={(option) => option[itemLable]}
            renderOption={(props: any, option, { selected }) => {
                delete props.key
                return <li key={option.id} {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option[itemLable]}
                </li>
            }
            }
            //   style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label={label}/>
            )}
        />
    );
}

