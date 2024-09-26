'use client'
import { getZones } from '@/api/admin/shippingApi'
import CustomNoRowsOverlay from '@/components/admin/CustomNoRowsOverlay'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import { methods_atom } from './Atoms'

const ShippingZonesList = () => {

    const zones_query = useQuery({
        queryKey: ['admin-zones'],
        queryFn: () => getZones()
    })

    const [methods, setMethods] =  useAtom(methods_atom);

    const router = useRouter()

    function handleEdit(zoneId: any){
        router.push(`/admin/shippings/zones/edit/${zoneId}`)
    }

    function handleDelete(zoneId: any){
        console.log(zoneId)
    }

    const columns: GridColDef[] = useMemo(()=> [
        // {field: 'id', headerName: 'Id', width:90},
        {field: 'name', headerName: 'Name', width: 125},
        {field: 'regions', headerName: 'Region(s)', width: 300,
            renderCell: (params) => {
                
                return <Box py={2}>
                    {params.row.regions.map((region: any) => {
                        return <Typography variant='body2' key={region.id}>{`${region.label} (${region.code})`}</Typography>
                    })
                }
                <Typography variant='body2'>{params.row.wildcard != '' && params.row.wildcard?.split('\n').join(', ')}</Typography>
                </Box>
            }
        },
        {field: 'methods', headerName: 'Shipping method(s)', width:250,
            renderCell: (params) => {
                return <Box py={2}>
                    {params.row.methods.length == 0 ? 'No shipping methods offered to this zone ' :params.row.methods.map((method: any) => method.name).join(' - ')}
                </Box>
            }
         },
         {
            field: 'actions',
            type: 'actions',
            width:150,
            renderCell: (params: GridRenderCellParams<any>, ) => {
                
                return (
                <>
                <Button sx={{textTransform: 'none', ml:'auto'}} onClick={() => handleEdit(params.row.id)}>
                    Edit
                </Button>
                {
                    params.row.id != 1 && (<>
                    |
                <Button sx={{textTransform: 'none', ml:'auto'}} onClick={() => handleDelete(params.row.id)} >
                    Delete
                </Button>
                    </>)
                }
                
                </>
            )}
        }
       ],
       []
    )

    return (
        <Box>
            <Box mt={2} display={'flex'} gap={4}>
                <Typography component={'p'} variant='h5'>
                    Shipping Zones
                </Typography>
               
                    <Button variant='contained' onClick={() => {
                        setMethods([])
                        router.push(`/admin/shippings/zones/create`);
                        }}>
                    Add Zone
                    </Button>
               
            </Box>

            <Box mt={4}>
                <Typography variant='caption'>
                A shipping zone consists of the region(s) you’d like to ship to and the shipping 
                method(s) offered. A shopper can only be matched to one zone, and we’ll use their 
                shipping address t show them the methods available in their area.
                </Typography>
            </Box>

            <Box>
                <DataGrid
                rows={zones_query.data} 
                columns={columns}
                getRowHeight={() => 'auto'}
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
                />
            </Box>
        </Box>
    )
}

export default ShippingZonesList
