import { client_products_query } from '@/Atoms'
import { url_query } from '@/utils/urls'
import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material'
import { useAtom } from 'jotai'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const FilterAttributeDropdown = ({widget}: {widget: any}) => {
    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams()  

    const [queries, setQueries] = useAtom(client_products_query)
    const value = queries.values

    function handleChange(e: any){
        setQueries({...queries, values: e.target.value})
        url_query('', 'page',pathname, router, searchParams, false)
    }

    return (
        <Box>
            <FormControl sx={{ minWidth: 195 }}>
            <InputLabel id="demo-simple-select-label">{widget.title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={widget.title}
                    onChange={handleChange}
                >
                    <MenuItem value={''}>None</MenuItem>
                    {widget.attribute.values.map((val: any) => {
                        return <MenuItem key={val.id} value={val.slug}>{val.title}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default FilterAttributeDropdown
