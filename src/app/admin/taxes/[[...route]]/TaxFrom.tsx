import { admin_drawer_tax, admin_snackbar } from '@/Atoms'
import { createTax, updateTax } from '@/api/admin/taxApi'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { useForm } from 'react-hook-form'

type FormValue = {
    id: number | undefined,
    title: string,
    price: string,
}
const TaxFrom = () => {
    const tax = useAtomValue(admin_drawer_tax)
    const setSnackbar = useSetAtom(admin_snackbar)

    const methods  = useForm<FormValue>({
        defaultValues:{
            id: tax.id,
            title: tax.title,
        }
    })

    const {register, control, handleSubmit, watch} = methods

    const queryClient = useQueryClient()

    const tax_mutation = useMutation({
        mutationFn: (data: FormValue) => tax.id ?  updateTax(data): createTax(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ['admin-taxes']})
            setSnackbar({
                state: true,
                message: tax.id ?  "Tax Updated" : "Tax Created"
            })
        },
    })

    function handle_submit(data: FormValue){
        tax_mutation.mutate(data)
    }

    return (
        <Box p={4} alignItems={'unset'}>
            <form onSubmit={handleSubmit(handle_submit)}>
            <Stack>
                <Box>
                    <TextField fullWidth helperText={'Title for the tax (shown on the front-end).'} label={'Title'} size='small' 
                    {...register('title')}/>
                </Box>


                <Box mt={3}>
                    <Button type='submit' size='small' variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, '&:hover':{ bgcolor: 'grey.900'} }}>
                        {tax?.id ? <>Update</> : <>Create</> }
                    </Button>
                </Box>
            </Stack>
            </form>
        </Box>
    )
}

export default TaxFrom
