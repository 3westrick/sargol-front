import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form';

const Category = ({ category }:{category: any}) => {

    const methods = useFormContext()
    const {setValue, getValues, watch} = methods
    const categories = watch('categories') ?? []

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setChecked(event.target.checked);
        const categories_copy = [...getValues('categories')]
        if (event.target.checked){
            categories_copy.push(category.id)
            setValue('categories', categories_copy)
        }else{
            setValue('categories', categories_copy.filter(cat => cat != category.id))
        }
    };


    return (
        <Box ml={2}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            // name={category.title}
                            // {...register(`categories.${category.id}`)}
                            
                            checked={categories.find((cat: number) => cat == category.id)? true: false}
                            onChange={handleChange}
                        />
                    }
                    label={category.title} />
            </FormGroup>
            {category.children.map((child: any) => <Category key={child.id} category={child} />)}
        </Box>
    )
}

export default Category
