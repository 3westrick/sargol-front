import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import React, { ReactNode } from 'react'

const MyMenuItem = ({text, open, icon, link}: {text:string, open: boolean, icon: ReactNode, link: string}) => {
  return (
    <Link href={link} style={{textDecoration: 'none'}}>
    <ListItem disablePadding sx={{ display: 'block', color: 'text.primary' ,'&:hover':{
        // textDecoration: 'underline !important'
    } }}>
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
    </ListItem>
    </Link>
  )
}

export default MyMenuItem
