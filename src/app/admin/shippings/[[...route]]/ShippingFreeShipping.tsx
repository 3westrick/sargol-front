import { Box, FormControl, FormLabel, Icon, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React from 'react'
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import { useAtom } from 'jotai';
import { method_free_shipping_requirements_atom, method_minimum_order_amount_atom, method_name_atom } from './Atoms';

const ShippingFreeShipping = () => {

    const [method_name, set_method_name] = useAtom(method_name_atom);
    const [method_free_shipping_requirements, set_method_free_shipping_requirements] = useAtom(method_free_shipping_requirements_atom);
    const [method_minimum_order_amount, set_method_minimum_order_amount] = useAtom(method_minimum_order_amount_atom);
    const handleChange = (event: SelectChangeEvent) => {
        set_method_free_shipping_requirements(event.target.value as string);
    };
    return (
        <>

        <Box>
            <TextField value={method_name} onChange={(e) => set_method_name(e.target.value) } label="name" size='small' fullWidth/>
        </Box>


        <Box mt={2}>
            <Box width={'100%'}>
                <FormLabel>Free Shipping Requires</FormLabel>
                <FormControl fullWidth size='small'>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={method_free_shipping_requirements}
                    // label="Age"
                    onChange={handleChange}
                    >
                    <MenuItem value={'none'}>No Requierments</MenuItem>
                    <MenuItem value={'coupon'}>A valid free shipping coupon</MenuItem>
                    <MenuItem value={'minimum'}>A minimum order amount</MenuItem>
                    <MenuItem value={'minimum_or_coupon'}>A minimum order amount OR coupon</MenuItem>
                    <MenuItem value={'minimum_and_coupon'}>A minimum order amount AND coupon</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>

        {['minimum', 'minimum_or_coupon', 'minimum_and_coupon'].includes(method_free_shipping_requirements)&&
            <Box mt={2}>
                <InputLabel htmlFor='minimum_order'>Minimum order amount</InputLabel>
                <TextField id='minimum_order' size='small' fullWidth     
                value={method_minimum_order_amount}    
                onChange={(e) => set_method_minimum_order_amount(e.target.value)}
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
        }
        
        </>
    )
}

export default ShippingFreeShipping
