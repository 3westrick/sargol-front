"use client"
import React from 'react'
import TemporaryDrawer from '@/components/admin/TemporaryDrawer'
import AttributeForm from './AttributeForm'
import { useAtom } from 'jotai'
import { admin_drawer_attribue } from '@/Atoms'

const AttributeDrawer = () => {
  const [attribute, setAsttirbute] = useAtom(admin_drawer_attribue)
  return (
    <TemporaryDrawer state={attribute != null} setState={setAsttirbute}>
      <AttributeForm/>
    </TemporaryDrawer>
  )
}

export default AttributeDrawer
