import { client_products_query } from '@/Atoms'
import { url_query } from '@/utils/urls'
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material'
import { useAtom } from 'jotai'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const FilterCategoryDropdown = ({widget}: {widget: any}) => {

    const [queries, setQueries] = useAtom(client_products_query)
    const category = queries.categories

    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams()    

    function handleChange(e: any){
        setQueries({...queries, categories: e.target.value})
        url_query('', 'page',pathname, router, searchParams, false)
    }

    return (
        <Box>
            <FormControl sx={{ minWidth: 195 }}>
            <InputLabel id="demo-simple-select-label">{widget.title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label={widget.title}
                    onChange={handleChange}
                >
                    <MenuItem value={''}>None</MenuItem>
                    {widget.categories.map((category: any) => {
                        return <MenuItem key={category.id} value={category.slug}>{category.title}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default FilterCategoryDropdown
