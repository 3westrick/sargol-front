import CustomNoRowsOverlay from '@/components/admin/CustomNoRowsOverlay'
import { Box, Button, Checkbox, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useAtom, useAtomValue } from 'jotai'
import React, { useMemo } from 'react'
import { method_delete_atom, method_edit_modal_open_atom, method_flate_rate_cost_atom, method_free_shipping_requirements_atom, method_local_pickup_cost_atom, method_minimum_order_amount_atom, method_name_atom, method_shipping_classes_atom, method_taxable_atom, method_type_atom, methods_atom, methods_id } from './Atoms'
import ShippingEditMethod from './ShippingEditMethod'

const ShippingMethodList = () => {
    const [method_edit_modal_open, set_method_edit_modal_open] = useAtom(method_edit_modal_open_atom)
    const [methods, setMethods] =  useAtom(methods_atom);
    const [methods_delete, setMethodsDelete] =  useAtom(method_delete_atom);
    const [method_id, set_method_id] =  useAtom(methods_id);
    const [method_type, set_method_type] =  useAtom(method_type_atom);
    const [method_name, set_method_name] = useAtom(method_name_atom);
    const [method_taxable, set_method_taxable] = useAtom(method_taxable_atom);
    const [method_free_shipping_requirements, set_method_free_shipping_requirements] = useAtom(method_free_shipping_requirements_atom);
    const [method_minimum_order_amount, set_method_minimum_order_amount] = useAtom(method_minimum_order_amount_atom);
    const [method_flate_rate_cost, set_method_flate_rate_cost] = useAtom(method_flate_rate_cost_atom);
    const [method_local_pickup_cost, set_method_local_pickup_cost] = useAtom(method_local_pickup_cost_atom);
    const [method_shipping_classes, set_method_shipping_classes] = useAtom(method_shipping_classes_atom);
  

    function handleDelete(id:any){
        setMethods(methods.filter((item: any) => item.id != id))
        setMethodsDelete([...methods_delete, id])
    }

    function handleEdit(id: any){
        // TODO: edit method :<
        const method = methods.find((item: any) => item.id == id)
        set_method_id(method.id)
        set_method_type(method.type)
        set_method_name(method.name)
        set_method_taxable(method.taxable)
        set_method_free_shipping_requirements(method.free_shipping_requirements)
        set_method_minimum_order_amount(method.minimum_order_amount)
        set_method_flate_rate_cost(method.flate_rate_qty ? method.flate_rate_cost + '*' : method.flate_rate_cost)
        set_method_local_pickup_cost(method.local_pickup_cost)
        set_method_shipping_classes(method.shipping_classes)
        set_method_edit_modal_open(true)
        
    }

    const columns: GridColDef[] = useMemo(()=> [
        // {field: 'id', headerName: 'Id', width:90},
        {field: 'name', headerName: 'Name', width: 125},
        {field: 'enabled', headerName: 'Enabled', width: 75,
            renderCell: (params: GridRenderCellParams<any>) => {
                return <Checkbox checked={params.row.enabled} onClick={(e:any) => {
                    let row = params.row
                    const temp = methods.map((item: any) => {
                        if (item.id == row.id){
                            return {...row, enabled : e.target.checked}
                        }else{
                            return item
                        }
                    })
                    setMethods(temp)
                }}/>
            }
        },
        {
            field: 'actions',
            type: 'actions',
            width:150,
            renderCell: (params: GridRenderCellParams<any>, ) => (
                <>
                <Button sx={{textTransform: 'none', ml:'auto'}} onClick={() => handleEdit(params.row.id)}>
                    Edit
                </Button>
                |
                <Button sx={{textTransform: 'none', ml:'auto'}} onClick={() => handleDelete(params.row.id)} >
                    Delete
                </Button>
                </>
            ),
        }
       ],
       [methods]
    )


    return (
        <Box>
        <DataGrid 
            rows={methods} 
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

            />
            <ShippingEditMethod/>
        </Box>
    )
}

export default ShippingMethodList
