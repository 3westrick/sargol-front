import { auth, signOut } from '@/lib/auth'
import { Box, Button, Divider, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session = await auth()

    async function log_out (){
        "use server"
        await signOut()
    }

    return (
        <Box>
        {
            session?.user.role && <Typography><Link href={'/admin'}>Admin Panel</Link></Typography>
        }
        {
            session ? <><form action={log_out}>
                <Button type='submit'>Sign out</Button>
            </form>
            <Link href={'/account'}>
            <Button>My Account</Button>
            </Link>

            </> :
            <><Link href={'/login'}>
            <Button>Login</Button>
            </Link>
            
            <Link href={'/register'}>
            <Button>Register</Button>
            </Link>
            </>
        }
        <Typography><Link href={'/products'}>Products</Link></Typography>
        <Typography><Link href={'/cart'}>Shopping Cart</Link></Typography>
        <Divider/>
        </Box>
    )
}

export default Navbar
