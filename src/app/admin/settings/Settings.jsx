"use client"
import { getGeneralOptions, updateGeneralOptions } from '@/api/admin/optionApi'
import { Autocomplete, Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Country, ICountry} from 'country-state-city'

const countries = Country.getAllCountries()

const Settings = () => {
    const {data:general_options} = useQuery({
        queryKey: ['admin-options-general'],
        queryFn: () => getGeneralOptions(),
    })
    let specific_value = general_options.find((item) => item.title == 'specific_countries').value
    if (specific_value != ''){
        specific_value = specific_value.split(';')
        specific_value = specific_value.map((item => Country.getCountryByCode(item)));
    }else{
        specific_value = []
    }
    let exception_value = general_options.find((item) => item.title == 'exception_countries').value
    if (exception_value != ''){
        exception_value = exception_value.split(';')
        exception_value = exception_value.map((item => Country.getCountryByCode(item)));
    }else{
        exception_value = []
    }

    let shipping_value = general_options.find((item) => item.title == 'shipping_countries').value
    if (shipping_value != ''){
        shipping_value = shipping_value.split(';')
        shipping_value = shipping_value.map((item => Country.getCountryByCode(item)));
    }else{
        shipping_value = []
    }

    const [selling_locations, set_selling_locations] = useState(general_options.find((item) => item.title == 'selling_locations').value);
    const [specific_countries, set_specific_countries] = useState(specific_value);
    const [exception_countries, set_exception_countries] = useState(exception_value);
    const [shipping_locations, set_shipping_locations] = useState(general_options.find((item) => item.title == 'shipping_locations').value);
    const [shipping_countries, set_shipping_countries] = useState(shipping_value);

    const update_taxes = useMutation({
        mutationFn: (data) => updateGeneralOptions(data)
    })

    function handleClick(){
        update_taxes.mutate({
            selling_locations,
            specific_countries: specific_countries.map(country => country.isoCode).join(';'),
            exception_countries: exception_countries.map(country => country.isoCode).join(';'),
            shipping_locations,
            shipping_countries: shipping_countries.map(country => country.isoCode).join(';'),
        })
    }


    
    return (
        <Box>
            <Box display={'flex'}>
                <Box width={300}>
                    <Typography>Selling location(s)</Typography>
                </Box>
                <FormControl size='small'>
                    <Select
                    sx={{width:350}}
                    id="demo-simple-select"
                    value={selling_locations}
                    onChange={(e) => {

                        set_selling_locations(e.target.value)
                        set_exception_countries([])
                        set_specific_countries([])
                    }}
                    >
                        <MenuItem value={'all_countries'}>Sell to all countries</MenuItem>
                        <MenuItem value={'all_countries_except_for'}>Sell to all countries, except for...</MenuItem>
                        <MenuItem value={'specific_countries'}>Sell to specific countries</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {
                selling_locations == 'all_countries_except_for' && (
                    <Box display={'flex'} mt={3}>
                        <Box width={300}>
                            <Typography>Exception countries</Typography>
                        </Box>
                        <Box>
                            {/* code */}
                            <Autocomplete
                            multiple
                            id="country-select-demo"
                            onChange={(event, data)=>{
                                set_exception_countries(data)
                            }}
                            value={exception_countries}
                            fullWidth
                            options={countries}
                            sx={{width:350}}
                            autoHighlight
                            isOptionEqualToValue = {(option , value) => option.name == value.name}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                }}
                                />
                            )}
                            />
                        </Box>

                    </Box>
                )
            }

            {
                selling_locations == 'specific_countries' && (
                    <Box display={'flex'} mt={3}>
                        <Box width={300}>
                            <Typography>Sell to specific country</Typography>
                        </Box>
                        <Box>
                            {/* code */}
                            <Autocomplete
                            multiple
                            id="country-select-demo"
                            onChange={(event, data)=>{
                                set_specific_countries(data)
                            }}
                            value={specific_countries}
                            fullWidth
                            options={countries}
                            sx={{width:350}}
                            autoHighlight
                            isOptionEqualToValue = {(option , value) => option.name == value.name}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                }}
                                />
                            )}
                            />
                        </Box>

                    </Box>
                )
            }

            
            <Box display={'flex'} mt={3}>
                <Box width={300}>
                    <Typography>Shipping location(s)</Typography>
                </Box>
                <FormControl size='small'>
                    <Select
                    sx={{width:350}}
                    id="demo-simple-select"
                    value={shipping_locations}
                    onChange={(e) => {
                        set_shipping_locations(e.target.value)
                    }}
                    >
                        <MenuItem value={'ship_to_all_countries_you_sell_to'}>Ship to all countries you sell to</MenuItem>
                        <MenuItem value={'ship_to_all_countries'}>Ship to all countries</MenuItem>
                        <MenuItem value={'deliver_to_specific_countries'}>Deliver to specific countries</MenuItem>
                        <MenuItem value={'disable_shipping_and_shipping_calculations'}>Disable shipping & shipping calculations</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {
                shipping_locations == 'deliver_to_specific_countries' && (
                    <Box display={'flex'} mt={3}>
                        <Box width={300}>
                            <Typography>Ship to specific country</Typography>
                        </Box>
                        <Box>
                            {/* code */}
                            <Autocomplete
                            multiple
                            id="country-select-demo"
                            onChange={(event, data)=>{
                                set_shipping_countries(data)
                            }}
                            value={shipping_countries}
                            fullWidth
                            options={countries}
                            sx={{width:350}}
                            autoHighlight
                            isOptionEqualToValue = {(option , value) => option.name == value.name}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                }}
                                />
                            )}
                            />
                        </Box>

                    </Box>
                )
            }

            <Box mt={3}>
                <Button variant='contained' onClick={handleClick}>
                    Save Changes
                </Button>
            </Box>
        </Box>
    )
}

export default Settings
