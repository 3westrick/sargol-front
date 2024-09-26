"use client"
import { client_coupons, client_coupons_price, client_sub_total } from '@/Atoms'
import { getProfile } from '@/api/client/account/accountApi'
import { getBasket, purchase } from '@/api/client/orders/orderAPI'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { checkShipping, getGeneralOptions } from '@/api/client/optionApi'
import { getCountires } from './utils'
import CountrySingleSelectComp from '@/components/client/CountrySingleSelectComp'
import { debounce } from '@mui/material/utils';
import UnAuthCheckout from './UnAuthCheckout'
import Login from './Login'
import { useSession } from "next-auth/react"
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


type FormValue = {
    first_name: string,
    last_name: string,
    
    country: string,
    city: string,
    address: string,
    postcode: string,

    phone: string,
    username : string,
    password : string,
    email : string,

    method: any,
    shipping_price: number,
    add_price: number
}

const Checkout = () => {
    // TODO: get basket, final price, coupons
    const {data:session} = useSession()

    const user_query = useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile()
    })

    const query = useQuery({
        queryKey: ['general-options'],
        queryFn: () => getGeneralOptions()
    })

    const basket_query = useQuery({
        queryKey: ['basket'],
        queryFn: () => getBasket()
    })

    // const [storage_sub_total_price, set_storage_sub_total_price] = useLocalStorage('sub_total', '')
    // const [storage_discounted_price, set_storage_discounted_price] = useLocalStorage('discounted_price', '')
    // const [storage_coupons, set_storage_coupons] = useLocalStorage('coupons', [])
    const [basket, set_basket] = useLocalStorage('basket', [])
    
    const [zone_methods, set_zone_methods] = useState<any[]>([])

    const countries = getCountires(query.data)

    const [open, setOpen] = useState(false)


    
    const purchase_mutation = useMutation({
        mutationFn: (data: any) => purchase(data),
        onSuccess: (res) => {
            if(res.error){
                console.log("error", res.error)
            }
            else{
                console.log(res)
            }
            
        }
    })

    const methods = useForm<FormValue>({
        defaultValues: {
            first_name : user_query?.data?.first_name,
            last_name : user_query?.data?.last_name,

            country: user_query?.data?.country,
            city: user_query?.data?.city,
            address: user_query?.data?.address,
            postcode: user_query?.data?.postcode,

            phone : user_query?.data?.phone,
            username : user_query?.data?.username,
            password : '',
            email : user_query?.data?.email,

            method: null,
            shipping_price: 0
        }
    })

    const {handleSubmit, register, watch} = methods

    function handle_submit(data: FormValue){
        data['add_price'] = zone_methods.find((method:any) => data.method == method.id).add_price
        purchase_mutation.mutate(data)
    }

    const check_shipping_mutation = useMutation({
        mutationFn: (data:any) => checkShipping(data),
        onSuccess: (res) => {
            set_zone_methods(res)
        }
    })

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    React.useEffect(() => {
        const subscription = watch(debounce((value, { name, type }) =>  {
            if(name == 'country' || name == 'postcode'){
                if(value.country && value.postcode){
                    check_shipping_mutation.mutate({
                        country: value.country.isoCode,
                        postcode: value.postcode,
                        basket: basket,
                        final_price: basket_query.data.final_price,
                        discounted_price: basket_query.data.discounted_price,
                        coupons: basket_query.data.coupons.map((coupon: any) => coupon.id ),
                    })
                }
            }
        }, 300)
        )
        return () => subscription.unsubscribe()
      }, [watch])

      
    if (basket_query.data.error) return (
        <Box>
            {basket_query.data.error} <Link href={'/cart'}>Back to Cart</Link>
        </Box>
    )
    return (
        <Box>
            <Box>
                <Typography>Full price: {basket_query.data.final_price}</Typography>
                <Typography>Coupons:</Typography>
                {
                    <ul>
                        {basket_query.data?.coupons.map((coupon:any) => {
                            return <li key={coupon.id}>{coupon.title}</li>
                        })}
                    </ul>
                }
                
            </Box>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handle_submit)}>
                <p>Shipping methods</p>
                    {zone_methods.map((method:any) => {
                        return <div key={method.id}>
                            <label>
                                <input type='radio' value={method.id} {...register('method')}/>
                                {method.name} : {method.add_price}
                            </label>
                            
                        </div>
                    })}
                <Box>
                    <TextField {...register('first_name')} label='First name'/>
                </Box>

                <Box mt={3}>
                    <TextField {...register('last_name')} label='Last name'/>
                </Box>

                <Box mt={3}>
                    <TextField {...register('email')} label='Email adress'/>
                </Box>

                <Box mt={3}>
                    <CountrySingleSelectComp countries={countries}/>
                </Box>

                <Box mt={3}>
                    <TextField {...register('city')} label='Town'/>
                </Box>

                <Box mt={3}>
                    <TextField {...register('address')} label='Address'/>
                </Box>


                <Box mt={3}>
                    <TextField {...register('postcode')} label='Post code'/>
                </Box>

                <Box mt={3}>
                    <TextField {...register('phone')} label='Phone number'/>
                </Box>

                {
                    session ? (
                    <Button type='submit'>
                        Continue To Shipping
                    </Button>
                    ):(
                    <Button onClick={() => setOpen(true)}>
                        some text
                    </Button>
                    )
                }


            </form>
            </FormProvider>
            <Login open={open} setOpen={setOpen} coupons={basket_query.data.coupons}/>
        
        </Box>
    )
}

export default Checkout
