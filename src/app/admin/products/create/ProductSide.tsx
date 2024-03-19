import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import UploadInput from '@/components/admin/UploadInput';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesProduct } from '@/api/admin/categories/categoryAPI';
import Category from './Category';
import { register } from 'module';
import { useFormContext } from 'react-hook-form';

const ProductSide = () => {

    const categories = useQuery({
        queryKey: ['admin-categories-product'],
        queryFn: () => getCategoriesProduct(),
    })


    const methods = useFormContext()
    const { register } = methods

    return (
        <Box>
            <Box>
                <Button type='button' color='inherit' variant='contained' sx={{ textTransform: 'unset', bgcolor: 'grey.300', borderRadius: 8, '&:hover': { bgcolor: 'grey.300' } }}>
                    Save draft
                </Button>

                <Button startIcon={<EditIcon />} type='submit' variant='contained' sx={{ textTransform: 'none', ml: 2, bgcolor: 'common.black', borderRadius: 8, '&:hover': { bgcolor: 'grey.900' } }}>
                    Publish
                </Button>
            </Box>

            <Box mt={3}>
                <Paper elevation={4}>
                    <Box p={2}>
                        <Typography>
                            Product image
                        </Typography>
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            sx={{ textTransform: 'unset', mt:4 }}
                            tabIndex={-1}
                            color='inherit'
                            startIcon={<EditIcon />}
                        >
                            Set product image
                            <UploadInput multiple={false} register={{...register('image')}} />
                        </Button>
                    </Box>
                </Paper>
            </Box>

            <Box mt={3}>
                <Paper elevation={4}>
                    <Box p={2}>
                        <Typography>
                            Product Gallery
                        </Typography>
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            sx={{ textTransform: 'unset', mt:4 }}
                            tabIndex={-1}
                            color='inherit'
                            startIcon={<EditIcon />}
                        >
                            Set product gallery images
                            <UploadInput multiple={true} register={{...register('gallery')}} />
                        </Button>
                    </Box>
                </Paper>
            </Box>

            <Box mt={3}>
                <Paper elevation={4}>
                    <Box p={2}>
                        <Typography>
                            Product Category
                        </Typography>
                        <Box>
                            {
                                categories.data.map((category:any) => <Category key={category.id} category={category}/>)
                            }
                        </Box>
                    </Box>
                </Paper>
            </Box>

        </Box>
    )
}

export default ProductSide
