import MyFormControl from '@/components/admin/MyFormControl'
import ShippingClassSelect from '@/components/admin/ShippingClassSelect'
import TaxClassSelect from '@/components/admin/TaxClassSelect'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit';
import UploadInput from '@/components/admin/UploadInput'
import ImageGallery from './ImageGallery'

const VariantCreate = ({index }: { index: number }) => {
    // console.log(variant)

    const methods = useFormContext()
    const {register, control, watch} = methods
    const gallery = watch(`variants.${index}.gallery`)
    const image = watch(`variants.${index}.image`)

    return (
        <Box>

            <Box>
              <TextField {...register(`variants.${index}.title`)} fullWidth size='small' label={'Title'} />
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='SKU'>
                    <TextField fullWidth size='small' {...register(`variants.${index}.sku`)}/>
                </MyFormControl>
            </Box>

            <Box mt={3}>
                <Typography>
                    Variation Image
                </Typography>
                <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    sx={{ textTransform: 'unset', mt: 1}}
                    tabIndex={-1}
                    color='inherit'
                    startIcon={<EditIcon />}
                >
                    Set Image
                    <Controller
                        control={control}
                        name={`variants.${index}.image`}
                        // rules={{ required: "image is required" }}
                        render={({ field: { value, onChange, ...field } }) => {
                            return <UploadInput multiple={false} onChange={(event: any) => onChange(event.target.files[0])}/>
                        }}
                    />
                    
                </Button>

                <Box p={2}>
                    {image ?
                    (
                        typeof image == 'string' ?
                        <Box component={'img'} src={image} width={'50%'}/>
                        :
                        <Box component={'img'} src={URL.createObjectURL(image)} width={'50%'}/>
                    )
                    :
                    <Typography>No Image Provided</Typography>
                    }
                </Box>
            </Box>

            <Box mt={3}>
                <Typography>
                    Variation Image Gallery
                </Typography>
                <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    sx={{ textTransform: 'unset', mt:1 }}
                    tabIndex={-1}
                    color='inherit'
                    startIcon={<EditIcon />}
                >
                    Add Gallery Images
                    <Controller
                        control={control}
                        name={`variants.${index}.gallery`}
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

            <Box>
            {gallery?.length > 0 ?
            <ImageGallery label={`variants.${index}.gallery`} cols={3}/>
            :
            <Typography sx={{mt:2, color: 'gray'}}>No Gallery Provided</Typography>
            }
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Regular Price'>
                    <TextField fullWidth type='number' size='small' {...register(`variants.${index}.regular_price`)}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Sale Price'>
                    <TextField fullWidth type='number' size='small' {...register(`variants.${index}.sale_price`)} />
                </MyFormControl>
            </Box>


            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Stock quantity'>
                    <TextField fullWidth size='small' {...register(`variants.${index}.stock`)}/>
                </MyFormControl>
            </Box>



            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Weight (kg)'>
                    <TextField fullWidth type='number' size='small' {...register(`variants.${index}.weight`)}/>
                </MyFormControl>
            </Box>

            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Dimensions (cm)'>
                    <Box width={'100%'} display={'flex'}>
                        <TextField sx={{width:90}} label="Length" type='number' size='small' {...register(`variants.${index}.length`)}/>
                        <TextField sx={{width:90}} label="Width" type='number' size='small' {...register(`variants.${index}.width`)}/>
                        <TextField sx={{width:90}} label="Height" type='number' size='small' {...register(`variants.${index}.height`)}/>
                    </Box>
                </MyFormControl>
            </Box>


            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Shipping class'>
                <ShippingClassSelect label={`variants.${index}.shipping_class`} />
                </MyFormControl>
            </Box>



            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <MyFormControl label='Tax class'>
                <TaxClassSelect label={`variants.${index}.tax_class`}/>
            </MyFormControl>
            </Box>

            <Box mt={3}>
              <TextField multiline minRows={3} fullWidth size='small' label={'Description'} {...register(`variants.${index}.description`)} />
            </Box>



            <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='MPN'>
                    <TextField fullWidth size='small' {...register(`variants.${index}.mpn`)}/>
                </MyFormControl>
            </Box>


            {/* <Box mt={3} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <MyFormControl label='Shipping Class'>
                    <SimpleSelect value={variant.shipping_class} setValue={(data) => handle_variant_change(data, 'shipping_class')} label='Tax Status' 
                    options={[
                        {value: 'no_shipping_class', label: 'No shipping class'},
                    ]}
                    />
                </MyFormControl>
            </Box> */}

            

        </Box>
    )
}

export default VariantCreate
