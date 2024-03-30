"use client"
import { getOrder } from '@/api/admin/orders/orderAPI'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const OrderSingle = ({orderId}: {orderId: number}) => {
    const order = useQuery({
        queryKey: ['admin-orders', orderId],
        queryFn:() => getOrder(orderId),
    })

    console.log(order.data)

    return (
        <Box>
            
        </Box>
    )
}

export default OrderSingle
