import { client_coupons, client_coupons_price, client_sub_total } from '@/Atoms'
import { useAtom } from 'jotai'
import React from 'react'

const UnAuthCheckout = () => {
    const [sub_total_price, set_sub_total_price] = useAtom(client_sub_total)
    const [discounted_price, set_discounted_price] = useAtom(client_coupons_price)
    const [coupons, setCoupon] = useAtom(client_coupons)
    return (
        <div>
        
        </div>
    )
}

export default UnAuthCheckout
