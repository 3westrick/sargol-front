import React from 'react'
import SimpleSelect from './SimpleSelect'
import { useQuery } from '@tanstack/react-query'
import { getAllShippings } from '@/api/admin/shippingApi'

const ShippingClassSelect = ({label}: {label: string}) => {
  const {data} = useQuery({
    queryKey: ['admin-shippings'],
    queryFn: () => getAllShippings()
  })

  console.log(data)
  
  return (
    <SimpleSelect label={label}
        options={data.map((shipping: any) => (
          {value: shipping.id, label: shipping.title}
        ))}
    />
  )
}

export default ShippingClassSelect
