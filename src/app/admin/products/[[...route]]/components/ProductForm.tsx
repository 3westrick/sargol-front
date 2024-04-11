import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React from 'react'
import ProductTitle from './ProductTitle';
import { Controller, useFormContext } from 'react-hook-form';
import TextEditor from '@/app/edit/TextEditor';
import ProductData from './ProductData';
import ProductSide from './ProductSide';

const ProductForm = () => {
    const {register, control} = useFormContext()
  return (
    <>
        <Grid container spacing={2}>
        <Grid item xs={9}>   
          <Box>

            <ProductTitle/>

            <Box mt={3}>
              <TextField {...register('slug')} fullWidth size='small' label={'Slug'} name='slug' />
            </Box>

            <Box mt={3}>
              <Controller
              control={control}
              name={'description'}
              // rules={{ required: "Recipe picture is required" }}
              render={({ field: { value, onChange, ...field } }) => {
                return <TextEditor 
                  value={value} 
                  onChange={(value: string) => {
                    onChange(value);
                  }} />
                }
              }
              />
            </Box>

            <Box mt={3}>
              <TextField {...register('short_description')} multiline minRows={3} fullWidth size='small' label={'Product short description'} name='short_description' />
            </Box>

            <Box mt={3}>
              <Typography>
                Product Data
              </Typography>

              <Box mt={3}>
                <Paper elevation={4}>
                  <Box p={2}>
                  <Controller
                    control={control}
                    name={'type'}
                    render={({ field: { value, onChange, ...field } }) => {

                      return (
                        <FormControl sx={{width:300}} size='small'>
                          <InputLabel id="product-data">Type</InputLabel>
                          <Select value={value} onChange={(e) => onChange(e.target.value)} labelId='product-data' label='Type'>
                            <MenuItem value={'simple'}>Simple</MenuItem>
                            <MenuItem value={'variation'}>Variation</MenuItem>
                          </Select>
                        </FormControl>
                      )

                      }
                    }
                  />

                  </Box>
                  <Divider/>
                  <Box>
                    <ProductData/>
                  </Box>
                </Paper>
              </Box>

            </Box>

          </Box>
        </Grid>

        <Grid item xs={3}>
          <ProductSide/>
        </Grid>

      </Grid>
    </>
  )
}

export default ProductForm
