import { client_products_query } from '@/Atoms'
import { getAttribute } from '@/api/client/attributes/attributeAPI'
import { url_query } from '@/utils/urls'
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const FilterAttributeList = ({widget}: {widget: any}) => {
    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams()  


    const [queries, setQueries] = useAtom(client_products_query)
    
    const values = queries.values == '' ? [] : queries.values.split(',')

    function handleChange(value_slug: string, checked: boolean) {
        
        if (checked){
            const slug_index = values.indexOf(value_slug)
            setQueries({...queries, values: [...values.slice(0,slug_index),...values.slice(slug_index+1)].join() })
            url_query('', 'page',pathname, router, searchParams, false)

        }else{
            values.push(value_slug)
            setQueries({...queries, values: values.join() })
            url_query('', 'page',pathname, router, searchParams, false)
        } 
    }
    
    return (
        <Box>
            <Typography variant='h4' component={'p'}>{widget.title}</Typography>
            <FormGroup>
                {widget.attributes?.values.map((value: any) => {
                    const checked = values.includes(value.slug)
                    return <FormControlLabel key={value.id} checked={checked} onChange={() => handleChange(value.slug, checked)} control={<Checkbox />} label={value.title} />
                })}
            </FormGroup>
        </Box>
    )
}

export default FilterAttributeList
