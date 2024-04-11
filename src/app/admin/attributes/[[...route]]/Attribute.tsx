"use client"
import { admin_drawer_value } from '@/Atoms'
import { getAttribute, getValues } from '@/api/admin/attributes/attributeAPI'
import CustomNoRowsOverlay from '@/components/admin/CustomNoRowsOverlay'
import { Box, Button, TextField, Typography } from '@mui/material'
import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridSortModel, GridToolbar } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import ValueDrawer from './ValueDrawer'
import EditIcon from '@mui/icons-material/Edit';
import { debounce } from '@mui/material/utils'

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
    const [query, setQuery] = React.useState("")
    const [field, setField] = React.useState("")
    const [order, setOrder] = React.useState("")


    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
      });
    const [rowCountState, setRowCountState] = React.useState(0);
      

    const attribute = useQuery({
        queryKey: ['admin-attributes', {attributeID}],
        queryFn: () => getAttribute(attributeID),
    })


    const values = useQuery({
        queryKey: ['admin-values', {attributeID, query, field, order, limit: paginationModel.pageSize, offset: paginationModel.page * paginationModel.pageSize}],
        queryFn: () => getValues(attributeID, query, field, order,  paginationModel.pageSize, paginationModel.page * paginationModel.pageSize),
    })



    const {data, isLoading, isFetched} =  values
    React.useEffect(() => {
        setRowCountState(values.data?.count || 0)
      }, [values.data?.count]);



    function handleSortModelChange(model: GridSortModel, details: GridCallbackDetails<any>){
        if(model[0]){
            const {field, sort} = model[0]
            setField(field)
            if (sort == 'desc'){
                setOrder("-")
            }else{
                setOrder("")
            }
        }else{
            setField("")
            setOrder("")
        }
    }

    const columns: GridColDef[] = attribute.data.type == 'normal' ?
    [
        {field: 'id', headerName: 'Id', width:90},
        {field: 'title', headerName: 'Title', flex: 1},
        {field: 'slug', headerName: 'Slug', flex: 1,},
        {field: 'image', headerName: 'Image', width: 150, 
            renderCell: ({id, row, value}) => (
                value && <Box ml={1} component={'img'} height={35} width={'auto'} 
                src={ typeof value == 'string' ? value : URL.createObjectURL(value)}/>
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



    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
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
            <Box mt={3} sx={{ minHeight:400, height: '100%', width: '100%' }}>
            <TextField variant='standard' fullWidth placeholder='Search' onChange={debounce(e => {
                setQuery(e.target.value)
            },500)} />


            <DataGrid 
            rows={isFetched ? data.results : []} 
            loading={isLoading}
            columns={columns}
            sx={{ '--DataGrid-overlayHeight': '300px', mt: 2 }}



            slots={{ 
                // toolbar: GridToolbar,
                noRowsOverlay: CustomNoRowsOverlay,
                // columnMenu: CustomColumnMenu
            }}
            disableColumnSelector
            disableDensitySelector
            disableColumnFilter

            sortingMode="server"
            onSortModelChange={handleSortModelChange}

            rowCount={rowCountState}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}

            />
        </Box>

            <ValueDrawer open={open} setOpen={setOpen}/>
        </>
    )
}

export default Attribute
