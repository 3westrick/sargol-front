import { Box, FormControl, FormLabel, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React from 'react'
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import { useAtom } from 'jotai';
import { method_local_pickup_cost_atom, method_name_atom, method_taxable_atom } from './Atoms';

const ShippingLocalPickup = () => {
    const [method_name, set_method_name] = useAtom(method_name_atom);
    const [method_taxable, set_method_taxable] = useAtom(method_taxable_atom);
    const [method_cost, set_method_cost] = useAtom(method_local_pickup_cost_atom);
    

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value == 'none'){
            set_method_taxable(false);
        }else{
            set_method_taxable(true);
        }
    };

    return (
        <>
            <Box>
                <TextField value={method_name} onChange={(e) => set_method_name(e.target.value)} label="name" size='small' fullWidth/>
            </Box>

            <Box mt={2}>
                <Box width={'100%'}>
                    <FormLabel>Tax status</FormLabel>
                    <FormControl fullWidth size='small'>
                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={method_taxable ? 'taxable': 'none'}
                        // label="Age"
                        onChange={handleChange}
                        >
                        <MenuItem value={'none'}>No tax</MenuItem>
                        <MenuItem value={'taxable'}>taxable</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Box mt={2}>
                {/* TODO: the option to put 10 * [qty] */}
                <InputLabel htmlFor='minimum_order'>Cost</InputLabel>
                <TextField id='minimum_order' size='small' fullWidth     
                value={method_cost}    
                onChange={(e) => set_method_cost(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <CurrencyPoundIcon sx={{
                                fontSize: 16
                            }}/>
                        </InputAdornment>
                    ),
                }}
                />
            </Box>
        
        </>
    )
}

export default ShippingLocalPickup
