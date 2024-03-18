import { admin_product_height, admin_product_length, admin_product_shipping_class, admin_product_weight, admin_product_width } from '@/Atoms'
import MyFormControl from '@/components/admin/MyFormControl'
import SimpleSelect from '@/components/admin/SimpleSelect'
import { Box, Divider, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import React from 'react'

const ProductShipping = () => {
    const [weight, setWeight] = useAtom(admin_product_weight)
    const [height, setHeight] = useAtom(admin_product_height)
    const [width, setWidth] = useAtom(admin_product_width)
    const [length, setLength] = useAtom(admin_product_length)
    const [shipclass, setShipclass] = useAtom(admin_product_shipping_class)

    return (
        <Box>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Weight (kg)'>
                    <TextField fullWidth type='number' size='small' value={weight} onChange={(e)=> setWeight(e.target.value)}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Dimensions (cm)'>
                    <Box width={'100%'} display={'flex'}>
                        <TextField sx={{width:90}} label="Length" type='number' size='small' value={length} onChange={(e)=> setLength(e.target.value)}/>
                        <TextField sx={{width:90}} label="Width" type='number' size='small' value={width} onChange={(e)=> setWidth(e.target.value)}/>
                        <TextField sx={{width:90}} label="Height" type='number' size='small' value={height} onChange={(e)=> setHeight(e.target.value)}/>
                    </Box>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Shipping Class'>
                    <SimpleSelect value={shipclass} setValue={setShipclass} label='Tax Status' 
                    options={[
                        {value: 'no_shipping_class', label: 'No shipping class'},
                    ]}
                    />
                </MyFormControl>
            </Box>

        
        </Box>
    )
}

export default ProductShipping
