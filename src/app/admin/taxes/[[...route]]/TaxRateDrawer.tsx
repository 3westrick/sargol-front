"use client"
import TemporaryDrawer from '@/components/admin/TemporaryDrawer'
import React from 'react'
import TaxRateFrom from './TaxRateFrom'

const TaxRateDrawer = ({open, setOpen} : {open: boolean, setOpen: any}) => {
    return (
        <TemporaryDrawer state={open} setState={setOpen}>
          <TaxRateFrom/>
        </TemporaryDrawer>
      )
}

export default TaxRateDrawer
