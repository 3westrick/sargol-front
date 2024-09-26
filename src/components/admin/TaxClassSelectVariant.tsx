import React from 'react'
import SimpleSelect from './SimpleSelect'
import { getAllTaxes } from '@/api/admin/taxApi'
import { useQuery } from '@tanstack/react-query'

const TaxClassSelectVariant = ({label}: {label: string}) => {
  const {data} = useQuery({
    queryKey: ['admin-taxes'],
    queryFn: () => getAllTaxes()
  })
  return (
    <SimpleSelect label={label}
    options={[
      {value: 0, label: 'Same as parent'}, 
      ...data.map((tax: any) => (
      {value: tax.id, label: tax.title}
    ))]}
    />
  )
}

export default TaxClassSelectVariant
