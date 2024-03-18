"use client"
import React, { useState, useTransition } from 'react'

import { admin_drawer_value, admin_snackbar } from '@/Atoms'
import { useAtom, useSetAtom } from 'jotai'
import { Box, Button, FormHelperText, Stack, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createValue, updateValue } from '@/api/admin/attributes/attributeAPI'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadInput from '@/components/admin/UploadInput'
// import { updateAttribute } from '@/app/admin/attributes/actions'

const ValueForm = () => {
    // useHydrateAtoms([[admin_drawer_attribue, attribute] as const ])
    const [value, setValue] = useAtom(admin_drawer_value)
    const setSnackbar = useSetAtom(admin_snackbar)
    console.log(value?.color)

    const queryClient = useQueryClient()
    const valueMutation = useMutation({
        mutationFn: (data) => value.id ?  updateValue(data): createValue(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries(['admin-attributes'])
            if (value.id) 
                queryClient.invalidateQueries(['admin-attributes', value.id])
            setSnackbar({
                state: true,
                message: value.id ?  "Value Updated" : "Value Created"
            })
        },
    })

    if (valueMutation.isError){
        throw new Error(valueMutation.error.message)
    }
    
    const handleClick = () => {
        // console.log(value)
        const data = new FormData()

        for ( let key in value ) {
            if (key == 'image' && typeof typeof value[key] == "string"){
                continue
            }
                
            data.append(key, value[key]);
        }
        

        valueMutation.mutate(data)        
    }

    const uploadImages = (e) => {
        // const files = Array.from(e.target.files).filter(f => extentions.includes(f.type));
        setValue({...value, image: e.target.files[0]})
      }
    

    return (
        <Box p={4} alignItems={'unset'}>
            <form action={handleClick}>
            <Stack>
                <Box>
                    <TextField fullWidth helperText={'Title for the value (shown on the front-end).'} label={'Title'} size='small' value={value?.title ?? ""} onChange={(e) => setValue({...value, title: e.target.value }) } />
                </Box>
                <Box mt={4}>
                    <TextField fullWidth helperText={"Unique slug for the value; must be no more than 28 characters."} label={'Slug'} size='small' value={value?.slug ?? ""} onChange={(e) => setValue({...value, slug: e.target.value }) } />
                </Box>

                <Box mt={3}>
                    <FormHelperText sx={{ml: 0}}>Image swatch</FormHelperText>
                    <Box display={'flex'} alignItems={'center'} mt={1}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            sx={{textTransform: 'unset'}}
                            tabIndex={-1}
                            color='inherit'
                            startIcon={<CloudUploadIcon />}
                            >
                            Upload
                            <UploadInput uploadImages={uploadImages} />
                        </Button>
                        {value?.image && <Box ml={1} component={'img'} height={35} width={'auto'} 
                        src={ typeof value?.image == 'string' ? value?.image : URL.createObjectURL(value?.image)}/>}
                    </Box>
                </Box>

                {value?.type == 'color' && <Box mt={3}>
                    <input value={value?.color} onChange={(e) => setValue({...value, color: e.target.value})} type='color'/>
                </Box>
                }

                <Box mt={3}>
                    <Button type='submit' size='small' variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, px:4, '&:hover':{ bgcolor: 'grey.900'},  }}>
                        {value?.id ? <>Update</> : <>Create</> }
                    </Button>
                </Box>

            </Stack>
            </form>
        </Box>
    )
}

export default ValueForm
