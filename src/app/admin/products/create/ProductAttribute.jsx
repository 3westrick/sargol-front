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
        attributes: selectedAttributes
    } = watch()
    
    const change_attributes = (data) => {
        const new_values = {}
        const new_visible = {}
        const new_variant = {}

        data.sort(function(a,b) {
            if ( a.id < b.id ){
                return -1;
              }
              if ( a.id > b.id ){
                return 1;
              }
              return 0;
        });

        data.map((item) => {
            if (!selectedValues[item.id]){
                // console.log(111)
                new_values[item.id] = []
            }else{
                new_values[item.id] = selectedValues[item.id]
            }

            if(!visibleAttributes[item.id]){
                new_visible[item.id] = false
                new_variant[item.id] = false
            }else{
                new_visible[item.id] = visibleAttributes[item.id]
                new_variant[item.id] = variantAttributes[item.id]
            }

            if(!variantAttributes[item.id]){
                new_variant[item.id] = false
            }else{
                new_variant[item.id] = variantAttributes[item.id]
            }

        })
        setValue('selectedValues' ,new_values)
        setValue('visibleAttributes' ,new_visible)
        setValue('variantAttributes' ,new_variant)
        setValue('attributes', data)
    }

    const change_values = (data, attribute) => {
        const obj = {}
        obj[attribute.id] = data
        setValue('selectedValues',{...selectedValues, ...obj})
    }

    const change_check_visible = (e, attribute) => {
        const obj = {}
        obj[attribute.id] = e.target.checked
        setValue('visibleAttributes' ,{...visibleAttributes, ...obj})
    }

    const change_check_variant= (e, attribute) => {
        const obj = {}
        obj[attribute.id] = e.target.checked
        setValue('variantAttributes', {...variantAttributes, ...obj})
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
                        return (
                            <CustomAccorion key={selected_attribute.id} header={selected_attribute.title}>
                            <FormGroup>
                               <FormControlLabel onChange={(e) => change_check_visible(e, selected_attribute)} control={<Checkbox checked={visibleAttributes[selected_attribute.id]}/>} label="Visible on the product page" />
                               <FormControlLabel onChange={(e) => change_check_variant(e, selected_attribute)} control={<Checkbox checked={variantAttributes[selected_attribute.id]}/>}label="Used for varitations" />
                            </FormGroup>
                            <Box mt={2}>
                            <CustomeCheckboxAutoComplete
                                items={selected_attribute.values}
                                label={selected_attribute.title + "'s values"}
                                itemKey='id'
                                itemValue='id'
                                itemLable='title'
                                l={`selectedValues.${selected_attribute.id}`}
                                onChange={(data) => change_values(data, selected_attribute)}
                                value={selectedValues[selected_attribute.id] ?? []}
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
