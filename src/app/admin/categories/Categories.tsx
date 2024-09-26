"use client"

import { admin_drawer_category } from "@/Atoms"
import { getCategories } from "@/api/admin/categories/categoryAPI"
import CustomNoRowsOverlay from "@/components/admin/CustomNoRowsOverlay"
import { Box, Button, TextField, Typography } from "@mui/material"
import { DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridSortModel, GridToolbar } from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import CategoryDrawer from "./CategoryDrawer"
import { debounce } from "@mui/material/utils"



const Categories = () => {
    
    const setAtomCategory = useSetAtom(admin_drawer_category)

    const [query, setQuery] = useState("")
    const [field, setField] = useState("")
    const [order, setOrder] = useState("")
    const [open, setOpen] = useState(false)

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [rowCountState, setRowCountState] = useState(0);
    const categories_query = useQuery({
        queryKey: ['admin-categories', {query, field, order, limit: paginationModel.pageSize, offset: paginationModel.page * paginationModel.pageSize}],
        queryFn: () => getCategories(query, field, order, paginationModel.pageSize, paginationModel.page * paginationModel.pageSize),
    })
    const {data, isLoading, isFetched} =  categories_query

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
      setRowCountState(categories_query.data?.count || 0)
    }, [categories_query.data?.count]);

    const columns: GridColDef[] = useMemo(()=> [
        {field: 'id', headerName: 'Id', width:90},
        {field: 'title', headerName: 'Title', flex: 1},
        {field: 'slug', headerName: 'Slug', flex: 1},
        {field: 'image', headerName: 'Image', width: 150, 
            renderCell: ({id, row, value}) => (
                value && <Box ml={1} component={'img'} height={35} width={'auto'} 
                src={ typeof value == 'string' ? value : URL.createObjectURL(value)}/>
            )
        },
        {field: 'parent', headerName: 'Parent', flex: 1,
        valueGetter: (params) => params.value? params.row.parent_cat.title : ''},
        {
            field: 'actions',
            type: 'actions',
            flex: 1,
            renderCell: (params: GridRenderCellParams<any>) => (
                <Button sx={{textTransform: 'none'}} onClick={() => {setAtomCategory({...params.row, parent: params.row.parent_cat}); setOpen(true)}}>
                    Edit
                </Button>
            ),
        }
       ],
       []
    )
    
    // const rows = data.results.map((attribute: CategoryProp) => ({
    //     id: attribute.id,
    //     title: attribute.title,
    //     slug: attribute.slug,
    //     parent: attribute.parent,
    //     parent_cat: attribute.parent_cat
    // })) 


    return (
        <>
        <Box>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant="h4">
                Categories
            </Typography>
            <Button onClick={() => {
                setAtomCategory({
                    title: '',
                    slug: '',
                    parent: null,
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
        <CategoryDrawer open={open} setOpen={setOpen}/>
        </>
    )
}

export default Categories
