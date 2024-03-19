"use client"
import React from 'react'
import TemporaryDrawer from '@/components/admin/TemporaryDrawer'
import AttributeForm from './AttributeForm'
import { useAtom } from 'jotai'
import { admin_drawer_attribue } from '@/Atoms'

const AttributeDrawer = ({open, setOpen} : {open: boolean, setOpen: any}) => {
  return (
    <TemporaryDrawer state={open} setState={setOpen}>
      <AttributeForm/>
    </TemporaryDrawer>
  )
}

export default AttributeDrawer
