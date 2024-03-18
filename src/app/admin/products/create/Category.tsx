import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import React from 'react'

const Category = ({ category }) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <Box ml={2}>

            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            name={category.title}
                            checked={checked}
                            onChange={handleChange}
                        />
                    }
                    label={category.title} />
            </FormGroup>
            {category.children.map(child => <Category key={child.id} category={child} />)}
        </Box>
    )
}

export default Category
