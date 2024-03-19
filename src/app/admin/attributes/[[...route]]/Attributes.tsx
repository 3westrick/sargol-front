"use client"

import { getAttributes } from "@/api/admin/attributes/attributeAPI"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import CustomNoRowsOverlay from "@/components/admin/CustomNoRowsOverlay";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import TemporaryDrawer from "@/components/admin/TemporaryDrawer";
import { useAtom, useSetAtom } from "jotai";
import { admin_drawer_attribue } from "@/Atoms";
import EditIcon from '@mui/icons-material/Edit';
import AttributeDrawer from "./AttributeDrawer";

type ValueProp = {
    id: number,
    title: string,
    slug: string,
}

type AttributeProp = {
    id: number,
    title: string,
    slug: string,
    type: string,
    values: ValueProp[],
}

const Attributes = () => {
    const router = useRouter()
    // useHydrateAtoms([[admin_drawer_attribue, null] as const ])
    const setAtomAttribute = useSetAtom(admin_drawer_attribue)

    const [open, setOpen] = useState(false)


    const attributes = useQuery({
        queryKey: ['admin-attributes'],
        queryFn: () => getAttributes()
    })


    const columns: GridColDef[] = useMemo(()=> [
        {field: 'id', headerName: 'Id', width:90},
        {field: 'title', headerName: 'Title', flex: 1},
        {field: 'slug', headerName: 'Slug', flex: 1},
        {field: 'values', headerName: 'Values', flex: 1,
        valueGetter: (params) => params.value.map((item: ValueProp) => item.title).join(", ")},
        {
            field: 'actions',
            type: 'actions',
            flex: 1,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    <Button onClick={() => router.push(`/admin/attributes/${params.id}/values`)} sx={{textTransform: 'none', mr:1}}>
                        Configure Values
                    </Button>
                    -
                    <Button sx={{textTransform: 'none'}} onClick={() => {setAtomAttribute(params.row); setOpen(true)}}>
                        Edit
                    </Button>
                </>
            ),
        }
       ],
       []
    //    [handleDelete]
    )
    
    const rows = attributes.data.map((attribute: AttributeProp) => ({
        id: attribute.id,
        title: attribute.title,
        slug: attribute.slug,
        type: attribute.type,
        values: attribute.values,
    })) 

  return (
    <div>
        <Box px={4} py={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant="h4">
                Attributes
            </Typography>
            <Button onClick={() => {
                setAtomAttribute({
                    title: '',
                    slug: '',
                    type: 'normal',
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
        <AttributeDrawer open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Attributes
