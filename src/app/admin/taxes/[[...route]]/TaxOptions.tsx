import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Typography } from '@mui/material'
import React from 'react'
import TaxEnterPrice from './TaxEnterPrice'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getTaxesOptions, updateTaxesOptions } from '@/api/admin/optionApi'

const TaxOptions = () => {
    const {data:tax_options} = useQuery({
        queryKey: ['admin-options-taxes'],
        queryFn: () => getTaxesOptions(),
    })
    const update_taxes = useMutation({
        mutationFn: (data: any) => updateTaxesOptions(data)
    })


    const [price_entered_with_tax, set_price_entered_with_tax] = React.useState(tax_options.find((item:any) => item.title == 'price_entered_with_tax').value);
    const [display_prices_in_shop, set_display_prices_in_shop] = React.useState(tax_options.find((item:any) => item.title == 'display_prices_in_the_shop').value);
    const [display_prices_in_basket, set_display_prices_in_basket] = React.useState(tax_options.find((item:any) => item.title == 'display_prices_during_basket_and_checkout').value);

    const handleDisplayPricesInShop = (event: SelectChangeEvent) => {
        set_display_prices_in_shop(event.target.value as string);
    };
    const handleDisplayPricesInBasket = (event: SelectChangeEvent) => {
        set_display_prices_in_basket(event.target.value as string);
    };

    function handleClick(){
        update_taxes.mutate({
            price_entered_with_tax: price_entered_with_tax,
            display_prices_in_the_shop: display_prices_in_shop,
            display_prices_during_basket_and_checkout: display_prices_in_basket,
        })
    }

    return (
        <Box>
            <Box mt={8}>

                <Box display={'flex'}>
                    <Box width={'300px'}>
                        <Typography>
                            Prices entered with tax 
                        </Typography>
                    </Box>
                    <Box>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={price_entered_with_tax}
                            onChange={(e) => set_price_entered_with_tax(e.target.value)}
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes, I will enter prices inclusive of tax" />
                            <FormControlLabel value="no" control={<Radio />} label="No, I will enter prices exclusive of tax" />
                        </RadioGroup>
                    </FormControl>
                    </Box>
                </Box>

                {/* <Box mt={4} display={'flex'}>
                    <Box width={'300px'}>
                        <Typography>
                            Additional tax classes
                        </Typography>
                    </Box>
                    <Box>
                        <ShippingDestionation/>
                    </Box>
                </Box> */}


                <Box mt={4} display={'flex'}>
                    <Box width={'300px'}>
                        <Typography>
                            Display prices in the shop
                        </Typography>
                    </Box>
                    <Box>
                        <FormControl size='small'>
                            <Select
                            id="demo-simple-select"
                            value={display_prices_in_shop}
                            onChange={handleDisplayPricesInShop}
                            >
                            <MenuItem value={'include'}>Including tax</MenuItem>
                            <MenuItem value={'exclude'}>Excluding tax</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>


                <Box mt={4} display={'flex'}>
                    <Box width={'300px'}>
                        <Typography>
                            Display prices during basket and checkout
                        </Typography>
                    </Box>
                    <Box>
                        
                        <FormControl size='small'>
                            <Select
                            id="demo-simple-select"
                            value={display_prices_in_basket}
                            onChange={handleDisplayPricesInBasket}
                            >
                            <MenuItem value={'include'}>Including tax</MenuItem>
                            <MenuItem value={'exclude'}>Excluding tax</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                
                <Box mt={4}>
                    <Button variant='contained' onClick={handleClick}>
                        Save Changes
                    </Button>
                </Box>

            </Box>   
        </Box>
    )
}

export default TaxOptions
