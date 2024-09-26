"use client"
import TemporaryDrawer from '@/components/admin/TemporaryDrawer'
import React from 'react'
import ShippingFrom from './ShippingFrom'

const ShippingDrawer = ({open, setOpen} : {open: boolean, setOpen: any}) => {
    return (
        <TemporaryDrawer state={open} setState={setOpen}>
          <ShippingFrom/>
        </TemporaryDrawer>
      )
}

export default ShippingDrawer
