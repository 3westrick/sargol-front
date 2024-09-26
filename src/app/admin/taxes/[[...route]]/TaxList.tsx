"use client"
import { admin_drawer_tax } from '@/Atoms'
import { getTaxes } from '@/api/admin/taxApi'
import CustomNoRowsOverlay from '@/components/admin/CustomNoRowsOverlay'
import { Box, Button, TextField, Typography } from '@mui/material'
import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import React, { useEffect, useMemo, useState } from 'react'
import { debounce } from "@mui/material/utils"
import EditIcon from '@mui/icons-material/Edit';
import TaxDrawer from './TaxDrawer'
import { useRouter } from 'next/navigation'

const TaxList = () => {
        
    const setAtomTax = useSetAtom(admin_drawer_tax)

    const [query, setQuery] = useState("")
    const [field, setField] = useState("")
    const [order, setOrder] = useState("")
    const [open, setOpen] = useState(false)

    const router = useRouter()

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [rowCountState, setRowCountState] = useState(0);
    const taxes_query = useQuery({
        queryKey: ['admin-taxes', {query, field, order, limit: paginationModel.pageSize, offset: paginationModel.page * paginationModel.pageSize}],
        queryFn: () => getTaxes(query, field, order, paginationModel.pageSize, paginationModel.page * paginationModel.pageSize),
    })
    const {data, isLoading, isFetched} =  taxes_query

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
        setRowCountState(taxes_query.data?.count || 0)
    }, [taxes_query.data?.count]);

    const columns: GridColDef[] = useMemo(()=> [
        {field: 'id', headerName: 'Id', width:90},
        {field: 'title', headerName: 'Title', flex: 1},
        {
            field: 'actions',
            type: 'actions',
            flex: 1,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                <Button onClick={() => router.push(`/admin/taxes/${params.id}`)} sx={{textTransform: 'none', mr:1}}>
                    Configure
                </Button>
                    -
                <Button sx={{textTransform: 'none'}} onClick={() => {setAtomTax({...params.row}); setOpen(true)}}>
                    Edit
                </Button>
                </>
            ),
        }
       ],
       []
    )

    return (
        <>
        <Box>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant="h4">
                Taxes
            </Typography>
            <Button onClick={() => {
                setAtomTax({
                    title: '',
                    price: '',
                });
                setOpen(true)
            }} startIcon={<EditIcon/>} variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, '&:hover':{ bgcolor: 'grey.900'} }}>
                Create
            </Button>
            </Box>
        </Box>
        <Box mt={3} sx={{ minHeight:400, height: '100%' }}>
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
        <TaxDrawer open={open} setOpen={setOpen}/>
        </>
    )
}

export default TaxList
