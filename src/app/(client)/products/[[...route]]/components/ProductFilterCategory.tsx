import { client_products_query } from '@/Atoms';
import { url_query } from '@/utils/urls';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import FilterCategoryList from './FilterCategoryList';
import FilterCategoryDropdown from './FilterCategoryDropdown';

const ProductFilterCategory = ({widget}: {widget: any}) => {
    if (widget.display == 'list') return <FilterCategoryList widget={widget}/>    
    if (widget.display == 'dropdown') return <FilterCategoryDropdown widget={widget}/>
    return <></>
}

export default ProductFilterCategory
