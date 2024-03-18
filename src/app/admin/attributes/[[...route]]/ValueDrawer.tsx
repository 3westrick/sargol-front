"use client"
import React from 'react'
import TemporaryDrawer from '@/components/admin/TemporaryDrawer'
import { useAtom } from 'jotai'
import {admin_drawer_value } from '@/Atoms'
import ValueForm from './ValueForm'

const ValueDrawer = () => {
  const [value, setValue] = useAtom(admin_drawer_value)
  return (
    <TemporaryDrawer state={value != null} setState={setValue}>
      <ValueForm/>
    </TemporaryDrawer>
  )
}

export default ValueDrawer
