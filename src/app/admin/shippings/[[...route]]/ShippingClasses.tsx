import { Box, Button, debounce, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import ShippingList from './ShippingList'
import ShippingDrawer from './ShippingDrawer'
import CustomNoRowsOverlay from '@/components/admin/CustomNoRowsOverlay'
import EditIcon from '@mui/icons-material/Edit';
import { useSetAtom } from 'jotai'
import { admin_drawer_shipping } from '@/Atoms'
import { useQuery } from '@tanstack/react-query'
import { getShippings } from '@/api/admin/shippingApi'
import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'


const ShippingClasses = () => {
      
    const setAtomShipping = useSetAtom(admin_drawer_shipping)

    const [query, setQuery] = useState("")
    const [field, setField] = useState("")
    const [order, setOrder] = useState("")
    const [open, setOpen] = useState(false)

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [rowCountState, setRowCountState] = useState(0);
    const shippings_query = useQuery({
        queryKey: ['admin-shippings', {query, field, order, limit: paginationModel.pageSize, offset: paginationModel.page * paginationModel.pageSize}],
        queryFn: () => getShippings(query, field, order, paginationModel.pageSize, paginationModel.page * paginationModel.pageSize),
    })
    const {data, isLoading, isFetched} =  shippings_query

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

    useEffect(() => {
        setRowCountState(shippings_query.data?.count || 0)
    }, [shippings_query.data?.count]);

    const columns: GridColDef[] = useMemo(()=> [
        // {field: 'id', headerName: 'Id', width:90},
        {field: 'title', headerName: 'Shipping class', width: 250},
        {field: 'slug', headerName: 'Slug', width: 200},
        {field: 'description', headerName: 'Description', width:250},
        {field: 'product_count', headerName: 'Product count', width: 150},
        {
            field: 'actions',
            type: 'actions',
            width:150,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                <Button sx={{textTransform: 'none', ml:'auto'}} onClick={() => {setAtomShipping({...params.row}); setOpen(true)}}>
                    Edit
                </Button>
                |
                <Button sx={{textTransform: 'none', ml:'auto'}} onClick={() => {setAtomShipping({...params.row}); setOpen(true)}}>
                    Delete
                </Button>
                </>
            ),
        }
       ],
       []
    )

    return (
        <Box>
            <Box mt={2} display={'flex'} gap={4}>
                <Typography component={'p'} variant='h5'>
                    Shipping Classes
                </Typography>
                <Button variant='contained' onClick={() => {
                    setAtomShipping({
                        title: '',
                        price: '',
                    });
                    setOpen(true)
                    }} startIcon={<EditIcon/>} >
                    Add Shipping Class
                </Button>
            </Box>

            <Box mt={4}>
                <Typography variant='caption'>
                Use shipping classes to customize the shipping rates for different groups of products, such as heavy items that require higher postage fees.
                </Typography>
            </Box>

            <Box>
            <Box mt={3} sx={{ height: (isFetched && data.results.length == 0 ? '400px' : '100%') }} className='sss'>
            <TextField variant='standard' fullWidth placeholder='Search' onChange={debounce(e => {
                setQuery(e.target.value)
            },500)} />
        <DataGrid 
            rows={(isFetched && data.results.length > 0) ? data.results : []} 
            loading={isLoading}
            columns={columns}
            sx={{ 
                '--DataGrid-overlayHeight': '300px', 
                mt: 2,
                // '& .MuiDataGrid-columnHeader':{
                //     ml: 'auto'
                // }
             }}

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
        <ShippingDrawer open={open} setOpen={setOpen}/>
            </Box>

        </Box>
    )
}

export default ShippingClasses