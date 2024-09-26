import { client_products_query } from '@/Atoms'
import { url_query } from '@/utils/urls'
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const FilterCategoryList = ({widget}: {widget: any}) => {

    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams()   

    const [queries, setQueries] = useAtom(client_products_query)
    
    const categories = queries.categories == '' ? [] : queries.categories.split(',')

    function handleChangeList(category_slug: string, checked: boolean) {
        if (checked){
            const slug_index = categories.indexOf(category_slug)
            setQueries({...queries, categories: [...categories.slice(0,slug_index),...categories.slice(slug_index+1)].join() })
            url_query('', 'page',pathname, router, searchParams, false)

        }else{
            categories.push(category_slug)
            setQueries({...queries, categories: categories.join() })
            url_query('', 'page',pathname, router, searchParams, false)
        } 
    }
    return (
        <Box>
            <Typography variant='h4' component={'p'}>{widget.title}</Typography>
                <FormGroup>
                    {widget.categories.map((category: any) => {
                        const checked = categories.includes(category.slug)
                        return <FormControlLabel key={category.id} checked={checked} onChange={() => handleChangeList(category.slug, checked)} control={<Checkbox />} label={category.title} />
                    })}
                </FormGroup>
        </Box>
    )
}

export default FilterCategoryList
