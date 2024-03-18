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

const ProductAttribute = () => {
    const attributes = useQuery({
        queryKey: ['admin-attributes'],
        queryFn: () => getAttributes()
    })


    // console.log(new_attributes)
    
    const [selectedAttributes, setSelectedAttributes] = useAtom(admin_product_attributes)
    const [selectedValues, setSelectedValues] = useAtom(admin_product_values)
    const [visibleAttributes, setVisibleAttributes] = useAtom(admin_product_attributes_visible)
    const [variantAttributes, setVariantAttributes] = useAtom(admin_product_attributes_variant)
    

    const change_attributes = (data) => {
        const new_values = {}
        const new_visible = {}
        const new_variant = {}

        data.sort(function(a,b) {
            return a.id - b.id;
        });

        data.map(item => {
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
        setSelectedValues(new_values)
        setVisibleAttributes(new_visible)
        setVariantAttributes(new_variant)
        setSelectedAttributes(data)
    }


    const change_values = (data, attribute) => {
        const obj = {}
        obj[attribute.id] = data
        setSelectedValues(prev => ({...prev, ...obj}))
    }

    const change_check_visible = (e, attribute) => {
        const obj = {}
        obj[attribute.id] = e.target.checked
        setVisibleAttributes(prev => ({...prev, ...obj}))
    }

    const change_check_variant= (e, attribute) => {
        const obj = {}
        obj[attribute.id] = e.target.checked
        setVariantAttributes(prev => ({...prev, ...obj}))
    }


    
    return (
        <Box>
            <Box>
                <CustomeCheckboxAutoComplete 
                    items={attributes.data}
                    label={'Attributes'}
                    itemKey='id'
                    itemValue='id'
                    itemLable='title'
                    // selectedItems={selectedAttributes} 
                    // setSelectedItems={(data) => change_attributes(data)}
                    value={selectedAttributes}
                    setValue={(data) => change_attributes(data)}
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
                           // selectedItems={selectedValues[selected_attribute.id] ?? []} 
                           // setSelectedItems={(data) => change_values(data, selected_attribute)}
                           value={selectedValues[selected_attribute.id] ?? []}
                           setValue={(data) => change_values(data, selected_attribute)}
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
