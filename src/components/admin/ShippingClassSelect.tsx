import React from 'react'
import SimpleSelect from './SimpleSelect'

const ShippingClassSelect = ({label}: {label: string}) => {
  return (
    <SimpleSelect label={label}
        options={[
            {value: 'no_shipping_class', label: 'No shipping class'},
        ]}
    />
  )
}

export default ShippingClassSelect
