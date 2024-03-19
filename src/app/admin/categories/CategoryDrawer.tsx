"use client"
import React from 'react'
import TemporaryDrawer from '@/components/admin/TemporaryDrawer'
import { useAtom } from 'jotai'
import {admin_drawer_category } from '@/Atoms'
import CategoryFrom from './CategoryForm'

const CategoryDrawer = ({open, setOpen} : {open: boolean, setOpen: any}) => {
  return (
    <TemporaryDrawer state={open} setState={setOpen}>
      <CategoryFrom/>
    </TemporaryDrawer>
  )
}

export default CategoryDrawer
