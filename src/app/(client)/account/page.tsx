import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const AccountPage =  async() => {
    return (
        <Box>
            <Typography>Account Page</Typography>
            <Link href="/orders"><Button>Orders</Button></Link>

        </Box>
    )
}

export default AccountPage
