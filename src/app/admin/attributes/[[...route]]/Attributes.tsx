"use client"

import { getAttributes } from "@/api/admin/attributes/attributeAPI"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { DataGrid, GridActionsCellItem, GridCallbackDetails, GridColDef, GridRenderCellParams, GridSortModel, GridToolbar } from '@mui/x-data-grid';
import CustomNoRowsOverlay from "@/components/admin/CustomNoRowsOverlay";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import TemporaryDrawer from "@/components/admin/TemporaryDrawer";
import { useAtom, useSetAtom } from "jotai";
import { admin_drawer_attribue } from "@/Atoms";
import EditIcon from '@mui/icons-material/Edit';
import AttributeDrawer from "./AttributeDrawer";
import { debounce } from "@mui/material/utils";

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
    const setAtomAttribute = useSetAtom(admin_drawer_attribue)
    
    const [query, setQuery] = useState("")
    const [field, setField] = useState("")
    const [order, setOrder] = useState("")
    const [open, setOpen] = useState(false)

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [rowCountState, setRowCountState] = useState(0);

    const attributes = useQuery({
        queryKey: ['admin-attributes',{query, field, order, limit: paginationModel.pageSize, offset: paginationModel.page * paginationModel.pageSize}],
        queryFn: () => getAttributes(query, field, order, paginationModel.pageSize, paginationModel.page * paginationModel.pageSize)
    })

    const {data, isLoading, isFetched} =  attributes

    function handleSortModelChange(model: GridSortModel, details: GridCallbackDetails<any>){
        if(model[0]){
            const {field: ff, sort} = model[0]
            
            setField(ff)
            
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
        setRowCountState(attributes.data?.count || 0)
      }, [attributes.data?.count]);

    const columns: GridColDef[] = useMemo(()=> [
        {field: 'id', headerName: 'Id', width:90},
        {field: 'title', headerName: 'Title', flex: 1},
        {field: 'slug', headerName: 'Slug', flex: 1},
        {field: 'type', headerName: 'Type', flex: 1},
        {field: 'values', headerName: 'Values', flex: 1, sortable: false,
        valueGetter: (params) => params.value.map((item: ValueProp) => item.title).join(", "),
        },
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
        },
       ],
       []
    //    [handleDelete]
    )
    

  return (
    <>
    <Box>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
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
    <AttributeDrawer open={open} setOpen={setOpen}/>
    </>
  )
}

export default Attributes
