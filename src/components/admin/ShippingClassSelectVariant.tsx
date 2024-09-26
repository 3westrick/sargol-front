import React from 'react'
import SimpleSelect from './SimpleSelect'
import { useQuery } from '@tanstack/react-query'
import { getAllShippings } from '@/api/admin/shippingApi'

const ShippingClassSelectVariant = ({label}: {label: string}) => {
  const {data} = useQuery({
    queryKey: ['admin-shippings'],
    queryFn: () => getAllShippings()
  })
  
  return (
    <SimpleSelect label={label}
        options={[
          {value: 0, label: 'Same as parent'}, 
          ...data.map((shipping: any) => (
          {value: shipping.id, label: shipping.title}
        ))]}
    />
  )
}

export default ShippingClassSelectVariant
