import React from 'react'
import SimpleSelect from './SimpleSelect'

const TaxClassSelect = ({label}: {label: string}) => {
  return (
    <SimpleSelect label={label}
        options={[
            {value: 'none', label: 'None'},
            {value: 'standard', label: 'Standard'},
        ]}
    />
  )
}

export default TaxClassSelect
