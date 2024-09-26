"use client"
import { getTax } from '@/api/admin/taxApi'
import { admin_drawer_rate } from '@/Atoms'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useSetAtom } from 'jotai'
import React, { useMemo, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CustomNoRowsOverlay from '@/components/admin/CustomNoRowsOverlay'
import TaxRateDrawer from './TaxRateDrawer'
import { Country, State, City }  from 'country-state-city';


const TaxRates = ({taxId}: {taxId: any}) => {
    const {data:tax} = useQuery({
        queryKey: ['admin-taxes', taxId],
        queryFn: () => getTax(taxId)
    })

    // GB GBR

    
    // console.log(csc.getCitiesOfState(232))


    // const setAtomRate = useSetAtom(admin_drawer_rate)
    const [aaa, setAtomRate] = useAtom(admin_drawer_rate)
    const [open, setOpen] = useState(false)
    // const q = useQuery({
    //     queryKey: ['admin-rates', taxId],
    //     queryFn: () => getRates(taxId)
    // })

    function setEditRate(data: any){
        const country = Country.getCountryByCode(data.country)
        if (country){
            data.country = country
            data.tax = tax.id
            setAtomRate(data)
            setOpen(true)
        }
        
    }

    const columns: GridColDef[] = useMemo(()=> [
        // {field: 'id', headerName: 'Id', width:90},
        {field: 'country', headerName: 'Country Code', width: 150},
        {field: 'states', headerName: 'State Code', width: 150},
        {field: 'zip_code', headerName: 'Postcode / ZIP', width: 150},
        // {field: 'city', headerName: 'City', width: 150},
        {field: 'rate', headerName: 'Rate %', width: 150},
        {field: 'name', headerName: 'Tax Name', width: 150},
        {field: 'on_shipping', headerName: 'Shipping', width: 100, type: 'boolean'},
        {
            field: 'actions', type: 'actions',
            renderCell: (params: GridRenderCellParams<any>) => (
                <Button sx={{textTransform: 'none'}} onClick={() => {setEditRate({...params.row});}}>
                    Edit
                </Button>
            )
        }
       ],
       []
    )
    return (
        <Box>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography>
                    {tax.title}
                </Typography>
                <Button onClick={() => {
                    setAtomRate({
                        id: undefined,
                        country: '',
                        states: [],
                        zip_code: '',
                        cities: '',
                        name: '',
                        rate: '',
                        on_shipping: true,
                        tax: taxId,
                    });
                    setOpen(true)
                    }} startIcon={<EditIcon/>} variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, '&:hover':{ bgcolor: 'grey.900'} }}>
                    Create
                </Button>
            </Box>

            <Box mt={3} sx={{ minHeight:400, height: '100%' }}>
                <DataGrid
                columns={columns}
                rows={tax.rates}
                slots={{ 
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
                />
            </Box>
            <TaxRateDrawer open={open} setOpen={setOpen}/>
        </Box>
    )
}

export default TaxRates
