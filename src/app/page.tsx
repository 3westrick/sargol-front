import Image from 'next/image'
import styles from './page.module.css'
import { auth } from '@/lib/auth'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export default async function Home() {
  const session = await auth()
  return (
    <Box>
      {
        session?.user.role && <Typography><Link href={'/admin'}>Admin Panel</Link></Typography>
      }
      <Typography>aaaaa</Typography>
    </Box>
  )
}
