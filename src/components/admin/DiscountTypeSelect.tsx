import React from 'react'
import SimpleSelect from './SimpleSelect'

const DiscountTypeSelect = ({label}: {label: string}) => {
  return (
    <SimpleSelect label={label}
        options={[
            {value: 'percentage', label: 'Percentage discount'},
            {value: 'fixed_basket', label: 'Fixed basket discount'},
            {value: 'fixed_product', label: 'Fixed product discount'},
        ]} />
  )
}

export default DiscountTypeSelect
