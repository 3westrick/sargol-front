import { checkShipping, getGeneralOptions } from '@/api/client/optionApi'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Country } from 'country-state-city'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

const CartShipping = () => {
    // TODO: get selling countries and shipping countries from setting
    // TODO:
    const query = useQuery({
        queryKey: ['general-options'],
        queryFn: () => getGeneralOptions()
    })

    const [shipping_countries, set_shipping_countries] = useState('IR')
    const [state, set_state] = useState('guilan')
    const [city, set_city] = useState('rasht')
    const [postcode, set_postcode] = useState('44556644')

    const general_options = {}
    query.data.map( item => {
        general_options[item.title] = item.value
    })
    general_options['shipping_countries'] = general_options['shipping_countries'].length > 0 ? general_options['shipping_countries'].split(';') : []
    general_options['specific_countries'] = general_options['specific_countries'].length > 0 ? general_options['specific_countries'].split(';') : []
    general_options['exception_countries'] = general_options['exception_countries'].length > 0 ? general_options['exception_countries'].split(';') : []

    let countires = []
    // check selling locations first

    
    if (general_options['selling_locations'] == 'all_countries'){
        // if you sell to all countries

        if(general_options['shipping_locations'] == 'ship_to_all_countries_you_sell_to' || general_options['shipping_locations'] == 'ship_to_all_countries'){
            // ... and if you ship to all countries you sell to
            countires = Country.getAllCountries()
        }else if (general_options['shipping_locations'] == 'deliver_to_specific_countries'){
            // ... and if you ship to specific countries
            countires = general_options['shipping_countries'].map(country => Country.getCountryByCode(country))
        }else{
            // TODO: what to do id shiping is disabled
        }
        
    }else if(general_options['selling_locations'] == 'all_countries_except_for') {
        // if you sell to all countries except for some
        if(general_options['shipping_locations'] == 'ship_to_all_countries_you_sell_to' || general_options['shipping_locations'] == 'ship_to_all_countries'){
            // ... and if you ship to all countries you sell to
            countires = Country.getAllCountries().filter(country => !general_options['exception_countries'].includes(country.isoCode))

        }else if (general_options['shipping_locations'] == 'deliver_to_specific_countries'){
            // ... and if you ship to specific countries
            countires = general_options['shipping_countries'].map(country => Country.getCountryByCode(country))

        }else{
            // TODO: what to do id shiping is disabled
        }
    }else {
        // you sell to specific countries
        if(general_options['shipping_locations'] == 'ship_to_all_countries_you_sell_to' || general_options['shipping_locations'] == 'ship_to_all_countries'){
            // ... if you ship to all countries you sell to
            countires = Country.getAllCountries().filter(country => general_options['specific_countries'].includes(country.isoCode))

        }else if (general_options['shipping_locations'] == 'deliver_to_specific_countries'){
            // ... if you ship to specific countries
            countires = general_options['shipping_countries'].map(country => Country.getCountryByCode(country))

        }else{
            // TODO: what to do id shiping is disabled
        }
    }

    const check_shipping_mutation = useMutation({
        mutationFn: (data) => checkShipping(data),
        onSuccess: () => {
            console.log('Suc')
        }
    })

    function handleUpdateShipping() {
        check_shipping_mutation.mutate({
            country: shipping_countries,
            state,
            city,
            postcode
        })
    }

    

    return (
        <Box mt={3}>
            <Box>
                {
                    countires.length == 1 ? (
                        <TextField size='small' label='country' value={countires[0]} disabled/>
                    ):(
                    <FormControl size='small'>
                        <InputLabel>country</InputLabel>
                        <Select
                        sx={{width:195}}
                        id="demo-simple-select"
                        label='country'
                        value={shipping_countries}
                        onChange={(e) => set_shipping_countries(e.target.value)}
                        >
                            {countires.map(country => <MenuItem key={country.isoCode} value={country.isoCode}>{country.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    )
                }
                
            </Box>
            <Box mt={3}>
                <TextField size='small' label='State / County' value={state} onChange={(e) => set_state(e.target.value)}/>
            </Box>
            <Box mt={3}>
                <TextField size='small' label='City' value={city} onChange={(e) => set_city(e.target.value)}/>
            </Box>
            <Box mt={3}>
                <TextField size='small' label='Postcode / Zip' value={postcode} onChange={(e) => set_postcode(e.target.value)}/>
            </Box>

        </Box>
    )
}

export default CartShipping
