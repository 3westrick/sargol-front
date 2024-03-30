import { auth } from '@/lib/auth'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import Navbar from './Navbar'

const ClientLayout = async ({children}: {children: ReactNode}) => {
    
    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}

export default ClientLayout
