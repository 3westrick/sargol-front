"use client"
import React from 'react'
import TemporaryDrawer from '@/components/admin/TemporaryDrawer'
import { useAtom } from 'jotai'
import {admin_drawer_category } from '@/Atoms'
import CategoryFrom from './CategoryForm'

const CategoryDrawer = () => {
  const [category, setCategory] = useAtom(admin_drawer_category)
  return (
    <TemporaryDrawer state={category != null} setState={setCategory}>
      <CategoryFrom/>
    </TemporaryDrawer>
  )
}

export default CategoryDrawer
