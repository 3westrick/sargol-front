import { admin_drawer_shipping, admin_snackbar } from '@/Atoms'
import { createShipping, updateShipping } from '@/api/admin/shippingApi'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { useForm } from 'react-hook-form'

type FormValue = {
    id: number | undefined,
    title: string,
    slug: string,
    description: string,
    price: string,
}
const ShippingFrom = () => {
    const shipping = useAtomValue(admin_drawer_shipping)
    const setSnackbar = useSetAtom(admin_snackbar)

    const methods  = useForm<FormValue>({
        defaultValues:{
            id: shipping.id,
            title: shipping.title,
            slug: shipping.slug,
            description: shipping.description,
        }
    })

    const {register, control, handleSubmit, watch} = methods

    const queryClient = useQueryClient()

    const shipping_mutation = useMutation({
        mutationFn: (data: FormValue) => shipping.id ?  updateShipping(data): createShipping(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ['admin-shippings']})
            setSnackbar({
                state: true,
                message: shipping.id ?  "Shipping Updated" : "Shipping Created"
            })
        },
    })

    function handle_submit(data: FormValue){
        shipping_mutation.mutate(data)
    }

    return (
        <Box p={4} alignItems={'unset'}>
            <form onSubmit={handleSubmit(handle_submit)}>
            <Stack gap={4}>
                <Box>
                    <TextField fullWidth helperText={'Title for the shipping (shown on the front-end).'} label={'Title'} size='small' 
                    {...register('title')}/>
                </Box>
                <Box>
                    <TextField fullWidth helperText={'slug for the shipping.'} label={'Slug'} size='small' 
                    {...register('slug')}/>
                </Box>
                <Box>
                    <TextField multiline rows={4} fullWidth helperText={'description for the shipping.'} label={'Description'} size='small' 
                    {...register('description')}/>
                </Box>

                <Box>
                    <Button type='submit' size='small' variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, '&:hover':{ bgcolor: 'grey.900'} }}>
                        {shipping?.id ? <>Update</> : <>Create</> }
                    </Button>
                </Box>
            </Stack>
            </form>
        </Box>
    )
}

export default ShippingFrom
