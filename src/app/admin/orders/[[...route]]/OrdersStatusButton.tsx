import { admin_orders_status } from '@/Atoms'
import { url_query } from '@/utils/urls'
import { Button, ButtonGroup } from '@mui/material'
import { useAtom } from 'jotai'
import { usePathname, useSearchParams,useRouter } from 'next/navigation'
import React from 'react'

const OrdersStatusButton = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()    
    const status = searchParams.get('status') ?? '';
    return (
        <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={() => url_query('','status', pathname, router, searchParams)} variant={status == '' ? 'contained' : 'outlined'}>All</Button>
            <Button onClick={() => url_query('processing','status', pathname, router, searchParams)} variant={status == 'processing' ? 'contained' : 'outlined'}>Processing</Button>
            <Button onClick={() => url_query('completed','status', pathname, router, searchParams)} variant={status == 'completed' ? 'contained' : 'outlined'}>Completed</Button>
            <Button onClick={() => url_query('canceled','status', pathname, router, searchParams)} variant={status == 'canceled' ? 'contained' : 'outlined'}>Canceled</Button>
            <Button onClick={() => url_query('refunded','status', pathname, router, searchParams)} variant={status == 'refunded' ? 'contained' : 'outlined'}>Refunded</Button>
            <Button onClick={() => url_query('failed','status', pathname, router, searchParams)} variant={status == 'failed' ? 'contained' : 'outlined'}>Failed</Button>
            <Button onClick={() => url_query('bin','status', pathname, router, searchParams)} variant={status == 'bin' ? 'contained' : 'outlined'}>Trash</Button>
        </ButtonGroup>
    )
}

export default OrdersStatusButton
