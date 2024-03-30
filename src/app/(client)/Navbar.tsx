import { auth } from '@/lib/auth'
import { Box, Divider, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session = await auth()
    return (
        <Box>
        {
            session?.user.role && <Typography><Link href={'/admin'}>Admin Panel</Link></Typography>
        }
        <Typography><Link href={'/products'}>Products</Link></Typography>
        <Typography><Link href={'/cart'}>Shopping Cart</Link></Typography>
        <Divider/>
        </Box>
    )
}

export default Navbar
