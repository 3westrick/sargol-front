"use client"
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import ShippingMethodModal from './ShippingMethodModal';
import CountrySelectComp from '@/components/admin/more/CountrySelectComp';
import ShippingAddingMethod from './ShippingAddingMethod';
import { FormProvider, useForm } from 'react-hook-form';
import ShippingMethodList from './ShippingMethodList';
import { method_delete_atom, methods_atom } from './Atoms';
import { useAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createShippingZone, getZone, updateZone } from '@/api/admin/shippingApi';
import { useRouter } from 'next/navigation';
// import GoogleMapsComp from '@/components/admin/more/GoogleMapsComp';

type ShippingClassForm = {
    shipping_class: number,
    cost: number
}

type ShippingMethodForm = {
    type: string,
    name: string,
    taxable: boolean,
    free_shipping_requirements: string | null,
    minimum_order_amount: number | null,
    flate_rate_cost: number | null,
    local_pickup_cost: number | null,
    shipping_classes : ShippingClassForm[] | null,
    enabled: boolean,
}

type ShippingZoneForm ={
    name: string,
    regions: any[],
    wildcard: string,
    methods: ShippingMethodForm[],
    deletes: []
}

const ShippingZoneEdit = ({zoneId}: {
    zoneId: any
}) => {

    const zone_query = useQuery({
        queryKey: ['admin-zones', zoneId],
        queryFn: () => getZone(zoneId),
    })

    const {data:zone_data} = zone_query

    const query = useQueryClient()
    
    const [open, setOpen] = React.useState(false);
    const [shipping_methods, set_methods] =  useAtom(methods_atom);
    const [methods_delete, setMethodsDelete] =  useAtom(method_delete_atom);
    const edit_method = useMutation({
        mutationFn: (data: any) => updateZone(zoneId, data),
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ['admin-zones', zoneId]
            })
        }
    })

    const handleOpen = () => setOpen(true);

    const methods = useForm<ShippingZoneForm>({
        defaultValues: {
            name: zone_data.name,
            regions: zone_data.regions,
            wildcard: zone_data.wildcard,
            methods: zone_data.methods,
        }
    })
    const {register, handleSubmit, control, getValues, setValue} = methods

    function onSubmit(data:ShippingZoneForm){
        data.methods = shipping_methods
        data.deletes = methods_delete
        edit_method.mutate(data)
    }

    useEffect(() => {
        set_methods(zone_data.methods)
    }, [])

    const router = useRouter()

    return (
        <Box>
            <FormProvider {...methods}>
            <Box>
                                    <Breadcrumbs
                                        separator={<NavigateNextIcon fontSize="small" />}
                                        aria-label="breadcrumb"
                                    >
                                        <span onClick={() => router.push('/admin/shippings')}>
                                    <Typography
                                        sx={{
                                                textDecoration: 'none',
                                                color:"inherit",
                                                '&:hover':{
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer'
                                                }
                                            }}                    
                                        >
                                        Shipping Zones
                                        </Typography>
                                        </span>
                                        <Typography color="text.primary">
                                        {zone_data.name}
                                        </Typography>,
                                    </Breadcrumbs>
                                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        zoneId != 1 && (
                            <>
                                

                                <Box mt={4} display={'flex'} gap={4}>
                                    <Box width={300}>
                                        <Typography>
                                            Zone name
                                        </Typography>

                                        <Typography variant='caption'>
                                            Give your zone a name! e.g. Local, or Worldwide.
                                        </Typography>
                                    </Box>

                                    <Box width={350}>
                                        <TextField  {...register('name')} size='small' fullWidth/>
                                    </Box>
                                </Box>

                                <Box mt={4} display={'flex'} gap={4}>
                                    <Box width={300}>
                                        <Typography>
                                            Zone regions
                                        </Typography>

                                        <Typography variant='caption'>
                                        List the regions you’d like to include in your shipping zone. Customers will be matched against these regions.
                                        </Typography>
                                    </Box>

                                    <Box>
                                    
                                        <CountrySelectComp/>

                                        <Box mt={4} sx={{ width: 350 }}>
                                            <Box>
                                                <TextField {...register('wildcard')} multiline rows={4} fullWidth placeholder='Bt*'/>
                                            </Box>
                                            <Box>
                                                <Typography variant='caption'>
                                                Poscodes containing wildcards (e.g. CB23*) or fully numeric ranges (e.g. 90210...99000) are also supported. 
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </Box>

                                    
                                </Box>
                            </>
                        )
                    }
                    

                    <Box mt={4} display={'flex'} gap={4}>
                        <Box width={300}>
                            <Typography>
                                Shipping methods
                            </Typography>

                            <Typography variant='caption'>
                            Add the shipping methods you’d like to make available to customers in this zone.
                            </Typography>
                        </Box>

                        <Box>
                            <Box>
                                <ShippingMethodList/>
                            </Box>
                            <Box mt={4}>
                                <Button variant='contained' onClick={handleOpen}>
                                    Add Shipping Method
                                </Button>
                                <ShippingAddingMethod open={open} setOpen={setOpen}/>
                            </Box>
                        </Box>

                    </Box>

                    <Box mt={4}>
                        <Button type='submit' variant='contained'>
                            Save Changes
                        </Button>
                    </Box>
                </form>

            </FormProvider>

        </Box>
    )
}

export default ShippingZoneEdit
