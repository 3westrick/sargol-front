import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CustomeCheckboxAutoComplete({ value, setValue, items, itemKey, itemValue, itemLable, label }: {
    value: any[],
    setValue: any,
    items: any[],
    itemKey: string, itemValue: string, itemLable: string, label: string,
}) {
    // const [inputValue, setInputValue] = React.useState('');
    // console.log(label,value)
    // console.log(label,items)

    return (
        <Autocomplete
            fullWidth
            multiple
            value={value}
            onChange={(event: any, newValue: any) => {
                setValue(newValue)
            }}
            id="checkboxes-tags-demo"
            options={items}
            disableCloseOnSelect
            getOptionLabel={(option) => option[itemLable]}
            renderOption={(props, option, { selected }) => {
                delete props.key;
                return <li key={option[itemKey]} {...props}>
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

