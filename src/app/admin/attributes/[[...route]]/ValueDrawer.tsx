"use client"
import React from 'react'
import TemporaryDrawer from '@/components/admin/TemporaryDrawer'
import { useAtom } from 'jotai'
import {admin_drawer_value } from '@/Atoms'
import ValueForm from './ValueForm'

const ValueDrawer = ({open, setOpen} : {open: boolean, setOpen: any}) => {
  return (
    <TemporaryDrawer state={open} setState={setOpen}>
      <ValueForm/>
    </TemporaryDrawer>
  )
}

export default ValueDrawer
