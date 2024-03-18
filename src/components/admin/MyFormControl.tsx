import { InputLabel } from '@mui/material'
import React, { ReactNode } from 'react'

const MyFormControl = ({children, label}: {children: ReactNode, label: string}) => {
  return (
    <>
        <InputLabel sx={{width: 300}}>{label}</InputLabel>
        {children}
    </>
  )
}

export default MyFormControl
