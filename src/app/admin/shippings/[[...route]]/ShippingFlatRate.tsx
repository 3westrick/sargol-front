import { Box, FormControl, FormLabel, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React from 'react'
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import { useQuery } from '@tanstack/react-query';
import { getAllShippings } from '@/api/admin/shippingApi';
import { useAtom } from 'jotai';
import { method_flate_rate_cost_atom, method_free_shipping_requirements_atom, method_local_pickup_cost_atom, method_minimum_order_amount_atom, method_name_atom, method_shipping_classes_atom, method_taxable_atom, method_type_atom } from './Atoms';


const ShippingFlatRate = () => {

    // TODO on edit it saves before submit
    const [method_name, set_method_name] = useAtom(method_name_atom);
    const [method_taxable, set_method_taxable] = useAtom(method_taxable_atom);
    const [method_flate_rate_cost, set_method_flate_rate_cost] = useAtom(method_flate_rate_cost_atom);
    const [method_shipping_classes, set_method_shipping_classes] = useAtom(method_shipping_classes_atom);

    
    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value == 'none'){
            set_method_taxable(false);
        }else{
            set_method_taxable(true);
        }
    };

    function handleShippingClass(cls: string, cost: string){
        let temp = method_shipping_classes
        temp[cls] = cost
        set_method_shipping_classes(temp)
    }

    const shippings_query = useQuery({
        queryKey: ['admin-shippings-all'],
        queryFn: () => getAllShippings(),
    })
    const {data, isLoading, isFetched} =  shippings_query

    // TODO: Handle Loading
    if (isLoading) return <h1>Loading</h1>


    
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
                <InputLabel htmlFor='flate_rate_cost'>Cost</InputLabel>
                <TextField id='flate_rate_cost' size='small' fullWidth     
                value={method_flate_rate_cost}   
                onChange={(e) => set_method_flate_rate_cost(e.target.value)} 
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

            <Box mt={2}>
                <Typography>Shipping class costs</Typography>
                <Typography variant='caption'>These costs can optionally be added based on the product shipping class. Learn more about setting shipping class costs.</Typography>
            </Box>

            <Box>
                {/* TODO: get shipping classes list */}

                {
                    isFetched && data.map((shipping: any) => {
                        if (shipping.slug!='no-shipping-class')
                        return <Box mt={2} key={shipping.id}>
                        {/* TODO: the option to put 10 * [qty] */}
                            <InputLabel htmlFor='minimum_order'>*{shipping.title}* shipping class cost</InputLabel>
                            <TextField id='minimum_order' size='small' fullWidth     
                            defaultValue={method_shipping_classes[shipping.id]} 
                            onChange={(e) => handleShippingClass(shipping.id, e.target.value)}   

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
                    })
                }
                
            </Box>
        </>
    )
}

export default ShippingFlatRate
