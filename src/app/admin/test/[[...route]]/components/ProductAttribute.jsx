import { admin_product_attributes, admin_product_values,admin_product_attributes_visible, admin_product_attributes_variant } from '@/Atoms'
import { getAttributes } from '@/api/admin/attributes/attributeAPI'
import CustomAccorion from '@/components/admin/CustomAccorion'
import MultipleSelectChip from '@/components/admin/MultipleSelectChip'
import { Box, Divider } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import CustomeCheckboxAutoComplete from '@/components/admin/CustomeCheckboxAutoComplete'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFormContext } from 'react-hook-form'

const ProductAttribute = () => {
    const attributes = useQuery({
        queryKey: ['admin-attributes'],
        queryFn: () => getAttributes()
    })

    const methods = useFormContext()
    const {register, watch, setValue} = methods
    

    const {
        selectedValues,
        visibleAttributes, 
        variantAttributes, 
        attributes: selectedAttributes,
        variants
    } = watch()
    
    
    const change_attributes = (data) => {
        setValue('attributes', data.sort((a,b) => a.id - b.id))
    }

    const change_values = (data, attribute) => {
        const other_values = []
        const value_ids = attribute.values.map(item => item.id) // [1,2,3]
        
        selectedValues.map(item => {
            if(! value_ids.includes(item.id))
            other_values.push(item)
        })

        setValue('selectedValues',[...other_values,...data].sort((a, b) => a.id - b.id))
    }

    const change_check_visible = (e, attribute) => {
        // const obj = {}
        // obj[attribute.id] = e.target.checked
        // setValue('visibleAttributes' ,{...visibleAttributes, ...obj})
        const data = e.target.checked
        const selected = [...visibleAttributes]
        if (data){
            selected.push(attribute.id)
            setValue('visibleAttributes' ,[...selected])
        }else{
            setValue('visibleAttributes', selected.filter(item => item != attribute.id))
        }
    }

    const change_check_variant= (e, attribute) => {
        
        const data = e.target.checked
        const selected = [...variantAttributes]
        if (data){
            selected.push(attribute.id)
            setValue('variantAttributes' ,[...selected])
            const s = variants.map(item => ({ ...item ,attributes : [...selected]}))
            const b = s.map(item => ({...item, values: item.values.slice(0,item.attributes.length)}))
            setValue('variants', b)
        }else{
            setValue('variantAttributes', selected.filter(item => item != attribute.id))
            const s = variants.map(item => ({ ...item ,attributes : selected.filter(item => item != attribute.id)}))
            const b = s.map(item => ({...item, values: item.values.slice(0,item.attributes.length)}))

            setValue('variants', b)
        }

    }


    
    return (
        <Box>
            <Box>
                <CustomeCheckboxAutoComplete 
                    items={attributes.data}
                    // items={attributes.data.map(item => ({...item, visible: false, variable: false}))}
                    label={'Attributes'}
                    l={'attributes'}
                    itemKey='id'
                    itemValue='id'
                    itemLable='title'
                    onChange={change_attributes}
                    value={selectedAttributes}
                    />
            </Box>

            <Box mt={3}>
                <Box>
                    {selectedAttributes.map(selected_attribute => {
                        const b = selected_attribute.values.filter(a => {
                            const s = selectedValues.find(selected_value => {
                                if(selected_value.id == a.id)
                                return selected_value
                            })
                            if (s) return s
                        })
                        // console.log(b)
                        
                        return (
                            <CustomAccorion key={selected_attribute.id} header={selected_attribute.title}>
                            <FormGroup>
                               <FormControlLabel onChange={(e) => change_check_visible(e, selected_attribute)} control={<Checkbox checked={visibleAttributes.includes(selected_attribute.id)}/>} label="Visible on the product page" />
                               <FormControlLabel onChange={(e) => change_check_variant(e, selected_attribute)} control={<Checkbox checked={variantAttributes.includes(selected_attribute.id)}/>}label="Used for varitations" />
                            </FormGroup>
                            <Box mt={2}>
                            <CustomeCheckboxAutoComplete
                                items={selected_attribute.values}
                                label={selected_attribute.title + "'s values"}
                                itemKey='id'
                                itemValue='id'
                                itemLable='title'
                                l={`aa.${selected_attribute.id}`}
                                onChange={(data) => change_values(data, selected_attribute)}
                                value={b}
                            />
                            </Box>
                        </CustomAccorion>  
                        )
                    })}
                </Box>
            </Box>
            <Box mt={3}>
            {/* <CustomeCheckboxAutoComplete

            /> */}
            </Box>
        </Box>
    )
}

export default ProductAttribute
