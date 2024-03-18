"use client"

import { admin_drawer_category } from "@/Atoms"
import { getCategories } from "@/api/admin/categories/categoryAPI"
import CustomNoRowsOverlay from "@/components/admin/CustomNoRowsOverlay"
import { Box, Button, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import EditIcon from '@mui/icons-material/Edit';
import CategoryDrawer from "./CategoryDrawer"

type CategoryProp = {
    id: number 
    title: string 
    slug: string 
    parent: number | undefined | null,
    parent_cat: any
}

const Categories = () => {
    const router = useRouter()
    const setAtomCategory = useSetAtom(admin_drawer_category)
    const categories = useQuery({
        queryKey: ['admin-categories'],
        queryFn: () => getCategories()
    })

    const columns: GridColDef[] = useMemo(()=> [
        {field: 'id', headerName: 'Id', width:90},
        {field: 'title', headerName: 'Title', flex: 1},
        {field: 'slug', headerName: 'Slug', flex: 1},
        {field: 'parent', headerName: 'Parent', flex: 1,
        valueGetter: (params) => params.value? params.row.parent_cat.title : ''},
        {
            field: 'actions',
            type: 'actions',
            flex: 1,
            renderCell: (params: GridRenderCellParams<any>) => (
                <Button sx={{textTransform: 'none'}} onClick={() => setAtomCategory({...params.row})}>
                    Edit
                </Button>
            ),
        }
       ],
       []
    )
    
    const rows = categories.data.map((attribute: CategoryProp) => ({
        id: attribute.id,
        title: attribute.title,
        slug: attribute.slug,
        parent: attribute.parent,
        parent_cat: attribute.parent_cat
    })) 


    return (
        <div>
        <Box px={4} py={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant="h4">
                Categories
            </Typography>
            <Button onClick={() => setAtomCategory({
                title: '',
                slug: '',
                parent: '',
            })} startIcon={<EditIcon/>} variant='contained' sx={{textTransform: 'none', bgcolor: 'common.black', borderRadius: 8, '&:hover':{ bgcolor: 'grey.900'} }}>
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
            sx={{ 
                '--DataGrid-overlayHeight': '300px'
            }}

        />
        <CategoryDrawer/>
        </div>
    )
}

export default Categories
