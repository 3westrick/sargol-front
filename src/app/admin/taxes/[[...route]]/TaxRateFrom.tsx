import { admin_drawer_rate, admin_snackbar } from '@/Atoms'
import { createRate, updateRate } from '@/api/admin/taxApi'
import { Box, Button, Checkbox, Stack, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import CountrySingleSelectComp from '@/components/admin/more/CountrySingleSelectComp';
import StateSelectMultiple from '@/components/admin/more/StateSelectMultiple';
import CitySelectMultiple from '@/components/admin/more/CitySelectMultiple';

type FormValue = {
    id: number | undefined,
    country: any,
    states: any,
    zip_code: any,
    cities: any,
    name: any,
    rate: any,
    on_shipping: boolean,
    tax: any
}
const TaxRateFrom = () => {
    const rate = useAtomValue(admin_drawer_rate)
    const setSnackbar = useSetAtom(admin_snackbar)

    // console.log(rate)
    // console.log(Country.getCountryByCode('IR'))
    // console.log(State.getStatesOfCountry('IR'))
    // console.log(City.getCitiesOfState('IR', '30'))

    const methods  = useForm<FormValue>({
        defaultValues:{
            id: rate.id,
            country: rate.country,
            states: rate.states,
            zip_code: rate.zip_code,
            cities: rate.city,
            name: rate.name,
            rate: rate.rate,
            on_shipping: rate.on_shipping,
            tax: rate.tax
        }
    })

    const {register, control, handleSubmit, watch} = methods

    const queryClient = useQueryClient()

    const tax_mutation = useMutation({
        mutationFn: (data: FormValue) => rate.id ?  updateRate(data): createRate(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ['admin-taxes']})
            setSnackbar({
                state: true,
                message: rate.id ?  "Tax Updated" : "Tax Created"
            })
        },
    })

    function handle_submit(data: FormValue){
        const obj = {...data,
            country: data.country.isoCode,
        }    
        // console.log(obj)
        tax_mutation.mutate(obj)
    }

    return (
        <Box p={4} alignItems={'unset'} width={500}>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handle_submit)}>
            <Stack>
                <Box mt={3}>
                    <CountrySingleSelectComp/>
                </Box>

                <Box mt={3}>
                    <TextField fullWidth label={'State'} size='small' 
                    {...register('states')}/>
                </Box>
                
                <Box mt={3}>
                    <TextField fullWidth label={'Zip Code'} size='small' 
                    {...register('zip_code')}/>
                </Box>
                
                <Box mt={3}>
                    <TextField fullWidth label={'Name'} size='small' 
                    {...register('name')}/>
                </Box>
                
                <Box mt={3}>
                    <TextField fullWidth label={'Rate %'} size='small' 
                    {...register('rate')}/>
                </Box>
                
                <Box mt={3}>
                    Shipping
                   <Controller
                   control={control}
                   name='on_shipping'
                   render={({ field: { value, onChange, ...field } }) => {
                    return <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)}/>
                   }}
                   />
                </Box>


                <Box mt={3}>
                    <Button type='submit' size='small' variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, '&:hover':{ bgcolor: 'grey.900'} }}>
                        {rate?.id ? <>Update</> : <>Create</> }
                    </Button>
                </Box>
            </Stack>
            </form>
            </FormProvider>
        </Box>
    )
}

export default TaxRateFrom
