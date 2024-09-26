import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, List, ListItem, Typography } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';
import { method_type_atom } from './Atoms';

export default function ShippingMethodType() {
    const [method_type, set_method_type] =  useAtom(method_type_atom);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_method_type(event.target.value);
    };


    const handleClick = (value: string) => {
        set_method_type(value)
    }

    const controlProps = (item: string) => ({
    checked: method_type === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
    });

    const containerProp = (item: string) => ({
    onClick: () => handleClick(item),
    sx: {
        border: "1px solid", 
        borderColor: method_type == item? "primary.main": '#666',
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 1.5,
        '&:hover': {
            borderColor: method_type == item? "primary.main": 'primary.light',
            cursor: method_type == item? "unset": 'pointer'
        }
    }
    });


  return (
        <div>
            <List>
                <ListItem>
                    <Box {...containerProp('free_shipping')} >
                        <Typography>Free shipping</Typography><Radio {...controlProps('free_shipping')} />
                    </Box>
                </ListItem>
                <ListItem>
                    <Box {...containerProp('flat_rate')}>
                        <Typography>Flat rate</Typography><Radio {...controlProps('flat_rate')} />
                    </Box>
                </ListItem>
                <ListItem>
                    <Box {...containerProp('local_pickup')}>
                        <Typography>Local pickup</Typography><Radio {...controlProps('local_pickup')} />
                    </Box>
                </ListItem>
            </List>
        </div>
  );
}
