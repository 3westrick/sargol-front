"use client"
import TemporaryDrawer from '@/components/admin/TemporaryDrawer'
import React from 'react'
import TaxFrom from './TaxFrom'

const TaxDrawer = ({open, setOpen} : {open: boolean, setOpen: any}) => {
    return (
        <TemporaryDrawer state={open} setState={setOpen}>
          <TaxFrom/>
        </TemporaryDrawer>
      )
}

export default TaxDrawer
