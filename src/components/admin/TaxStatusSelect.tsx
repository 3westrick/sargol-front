import React from 'react'
import SimpleSelect from './SimpleSelect'

const TaxStatusSelect = ({label}: {label: string}) => {
  return (
    <SimpleSelect label={label}
        options={[
            {value: 'none', label: 'None'},
            {value: 'taxable', label: 'Taxable'},
        ]} />
  )
}

export default TaxStatusSelect
