import { Box } from '@mui/material'
import React from 'react'
import ShippingFreeShipping from './ShippingFreeShipping'
import ShippingLocalPickup from './ShippingLocalPickup'
import ShippingFlatRate from './ShippingFlatRate'
import { useAtomValue } from 'jotai'
import { method_type_atom } from './Atoms'

const ShippingMethodDetails = () => {

    const method_type =  useAtomValue(method_type_atom);

    // TODO: Free Shipping
    if (method_type == 'free_shipping'){
        return (
            <Box padding={2}>
                <ShippingFreeShipping/>
            </Box>
        )
    }

    // TODO: Flat Rate
    if (method_type == 'flat_rate'){
        return (
            <Box padding={2}>
                <ShippingFlatRate/>
            </Box>
        )
    }

    // TODO: Local Pickup
    if (method_type == 'local_pickup'){
        return (
            <Box padding={2}>
                <ShippingLocalPickup/>
            </Box>
        )
    }

    return

}

export default ShippingMethodDetails
