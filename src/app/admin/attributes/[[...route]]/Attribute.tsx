"use client"
import { admin_drawer_value } from '@/Atoms'
import { getAttribute } from '@/api/admin/attributes/attributeAPI'
import CustomNoRowsOverlay from '@/components/admin/CustomNoRowsOverlay'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import ValueDrawer from './ValueDrawer'
import EditIcon from '@mui/icons-material/Edit';

type ValueProp = {
    id: number,
    title: string,
    slug: string,
    color: string,
    image: any
}

type AttributeProp = {
    id: number,
    title: string,
    slug: string,
    values: ValueProp[],
}

const Attribute = ({attributeID}: {attributeID: number}) => {
    // const router = useRouter()
    const setAtomValue = useSetAtom(admin_drawer_value)
    const [open, setOpen] = useState(false)

    const attribute = useQuery({
        queryKey: ['admin-attributes', attributeID],
        queryFn: () => getAttribute(attributeID),
    })



    const columns: GridColDef[] = useMemo(()=> (
        attribute.data.type == 'normal' ?
            [
                {field: 'id', headerName: 'Id', width:90},
                {field: 'title', headerName: 'Title', flex: 1},
                {field: 'slug', headerName: 'Slug', flex: 1,},
                {
                    field: 'actions',
                    type: 'actions',
                    flex: 1,
                    renderCell: (params: GridRenderCellParams<any>) => (
                        <Button sx={{textTransform: 'none'}} onClick={() => setAtomValue(params.row)}>
                            Edit
                        </Button>
                    ),
                }
           ]:
           [
                {field: 'id', headerName: 'Id', width:90},
                {field: 'title', headerName: 'Title', flex: 1},
                {field: 'slug', headerName: 'Slug', flex: 1,},
                {field: 'color', headerName: 'Color', flex: 1,
                    renderCell: (params: GridRenderCellParams<any>) => (
                        <Box component={'span'} sx={{width: 25, height: 25, bgcolor: params.value, borderRadius:'50%', border: 0, boxShadow: '0px 2px 4px'}}/>
                    )
                },
                {
                    field: 'actions',
                    type: 'actions',
                    flex: 1,
                    renderCell: (params: GridRenderCellParams<any>) => (
                        <Button sx={{textTransform: 'none'}} onClick={() => {setAtomValue(params.row); setOpen(true)}}>
                            Edit
                        </Button>
                    ),
                }
        ]

    ),
       []
    //    [handleDelete]
    )
    
    const rows = attribute.data.values.map((value: ValueProp) => ({
        id: value.id,
        title: value.title,
        slug: value.slug,
        color: value.color,
        image: value.image,
        type: attribute.data.type
    })) 

    return (
        <>
            <Box px={4} py={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="h4">
                    {attribute.data.title}&apos;s Values
                </Typography>
                <Button onClick={() => {setAtomValue({
                    title: '',
                    slug: '',
                    image: '',
                    color: '',
                    attribute: attributeID,
                    type: attribute.data.type
                });
                setOpen(true)
            }
                } startIcon={<EditIcon/>} size='small' variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, '&:hover':{ bgcolor: 'grey.900'} }}>
                    Create
                </Button>
            </Box>
            <DataGrid 
            editMode='row'
            checkboxSelection 
            disableRowSelectionOnClick
            rows={rows} columns={columns}
            slots={{ 
                toolbar: GridToolbar, 
                noRowsOverlay: CustomNoRowsOverlay
            }} 
            sx={{ '--DataGrid-overlayHeight': '300px' }}
            />
            <ValueDrawer open={open} setOpen={setOpen}/>
        </>
    )
}

export default Attribute
