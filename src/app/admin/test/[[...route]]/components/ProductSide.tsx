import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useId } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import UploadInput from '@/components/admin/UploadInput';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesProduct } from '@/api/admin/categories/categoryAPI';
import Category from './Category';
import { register } from 'module';
import { Controller, useFormContext } from 'react-hook-form';
import ImageGallery from './ImageGallery';

const ProductSide = () => {
    
    const categories = useQuery({
        queryKey: ['admin-categories-product'],
        queryFn: () => getCategoriesProduct(),
    })


    const { control, watch } = useFormContext()

    const {image, gallery} = watch()
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
                            <Controller
                                control={control}
                                name='image'
                                // rules={{ required: "image is required" }}
                                render={({ field: { value, onChange, ...field } }) => {
                                    return <UploadInput multiple={false} onChange={(event: any) => onChange(event.target.files[0])}/>
                                }}
                            />
                            
                        </Button>
                    </Box>
                    
                    <Box p={2}>
                        {image ?
                        (
                            typeof image == 'string' ?
                            <Box component={'img'} src={image} width={'100%'}/>
                            :
                            <Box component={'img'} src={URL.createObjectURL(image)} width={'100%'}/>
                        )
                        :
                        <Typography>No Image Provided</Typography>
                        }
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
                            <Controller
                                control={control}
                                name='gallery'
                                // rules={{ required: "image is required" }}
                                render={({ field: { value, onChange, ...field } }) => {
                                    return <UploadInput multiple={true} onChange={(event: any) => {
                                        const image_list = []
                                        for(let i = 0; i < event.target.files.length; i++){
                                            image_list.push({file: event.target.files[i], id: crypto.randomUUID()})
                                        }
                                        onChange([...image_list, ...gallery])
                                    }}/>
                                }}
                            />
                        </Button>
                    </Box>

                    <Box p={2}>
                        {gallery ?
                         <ImageGallery/>
                        :
                        <Typography>No Gallery Provided</Typography>
                        }
                       
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
