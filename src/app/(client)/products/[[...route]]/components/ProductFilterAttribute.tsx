import React from 'react'
import FilterAttributeList from './FilterAttributeList'
import FilterAttributeDropdown from './FilterAttributeDropdown'

const ProductFilterAttribute = ({widget}: {widget: any}) => {
    if (widget.display == 'list') return <FilterAttributeList widget={widget}/>
    if (widget.display == 'dropdown') return <FilterAttributeDropdown widget={widget}/>
    return <></>
}

export default ProductFilterAttribute
