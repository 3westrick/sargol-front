import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import ShippingCalculations from './ShippingCalculations'
import ShippingDestionation from './ShippingDestionation'
import { useAtom } from 'jotai'
import { shipping_options } from './Atoms'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getShippingOptions, updateShippingOptions } from '@/api/admin/optionApi'

const ShippingSettings = () => {
    const {data:shipping_options} = useQuery({
        queryKey: ['admin-options-shippings'],
        queryFn: () => getShippingOptions(),
    })
    const update_shipping = useMutation({
        mutationFn: (data: any) => updateShippingOptions(data)
    })

    // const calculation_option = shipping_options.find((item:any) => item.title == 'shipping_calculations')
    // const [calculation_value, setCalculationValue] = React.useState(calculation_option.value);
    const destination_option = shipping_options.find((item:any) => item.title == 'shipping_destination')
    const [destination_value, setDestinationValue] = React.useState(destination_option.value);

    function handleClick(){
        update_shipping.mutate({
            // shipping_calculations: calculation_value,
            shipping_destination: destination_value,
        })
    }


    return (
        <Box>
            <Box mt={2}>
                <Typography component={'p'} variant='h5'>
                    Shipping Settings
                </Typography>
            </Box>

            <Box mt={8}>

                {/* <Box display={'flex'}>
                    <Box width={'300px'}>
                        <Typography>
                            Calculations
                        </Typography>
                    </Box>
                    <Box>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={calculation_value}
                            onChange={(e) => setCalculationValue(e.target.value)}
                        >
                            <FormControlLabel value="enable_on_basket_page" control={<Radio />} label="Enable the shipping calculator on the basket page" />
                            <FormControlLabel value="hide_until_address_entered" control={<Radio />} label="Hide shipping costs until an address is entered" />
                        </RadioGroup>
                    </FormControl>
                    </Box>
                </Box> */}

                <Box mt={4} display={'flex'}>
                    <Box width={'300px'}>
                        <Typography>
                            Shipping Destionation
                        </Typography>
                    </Box>
                    <Box>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={destination_value}
                            onChange={(e) => setDestinationValue(e.target.value)}
                        >
                            <FormControlLabel value="default_shipping_address" control={<Radio />} label="Default to customer shipping address" />
                            <FormControlLabel value="default_billing_address" control={<Radio />} label="Default to customer billing address" />
                            <FormControlLabel value="force_billing_address" control={<Radio />} label="Force shipping to the customer billing address" />
                        </RadioGroup>
                        </FormControl>
                    </Box>
                </Box>

            </Box>

            <Box mt={4}>
                <Button variant='contained' onClick={handleClick}>
                    Save Changes
                </Button>
            </Box>
            
        </Box>
    )
}

export default ShippingSettings
