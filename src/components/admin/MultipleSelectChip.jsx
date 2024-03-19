import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, selectedItems, theme) {
  return {
    fontWeight:
      selectedItems.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({selectedItems, setSelectedItems, items, itemKey, itemValue, itemLable, label}
//   :{
//   selectedItems: string[],
//   setSelectedItems: any,
//   items : any[],
//   itemKey: string, itemValue: string, itemLable: string, label: string
// }
) {
  const theme = useTheme();


  const handleChange = (event
    // : SelectChangeEvent<typeof selectedItems>
    ) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(
      // On autofill we get a stringified value.
      value.sort()
    );
  };

  return (
    <div>
      <FormControl size='small' fullWidth sx={{ m: 1 }}>
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          labelId={`demo-multiple-${label}-label`}
          id={`demo-multiple-${label}`}
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput id={`select-multiple-${label}`} label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={items.find(item => item.id == value).title} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem
              key={item[itemKey]}
              value={item[itemValue]}
              // style={getStyles(item, selectedItems, theme)}
            >
              {item[itemLable]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}