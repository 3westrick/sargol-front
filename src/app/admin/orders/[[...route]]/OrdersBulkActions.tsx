import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAtom, useAtomValue } from 'jotai';
import { admin_orders_selected_rows } from '@/Atoms';
import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { updateOrder } from '@/api/admin/orders/orderAPI';

export default function BasicSelect() {
  const rowSelectionModel = useAtomValue(admin_orders_selected_rows)
  const [buldAction, setBulkAction] = React.useState('')

  const update_orders = useMutation({
    mutationFn: (data:any) => updateOrder(data),
    onSuccess(data, variables, context) {
        console.log('suc')
    },
  })

  const handleChange = (event: SelectChangeEvent) => {
    setBulkAction(event.target.value)
  };
  function handleApply(){
    rowSelectionModel.map(row => {
        update_orders.mutate({
            id: row,
            status: buldAction
        })
    })
    console.log(buldAction, rowSelectionModel)
  }

  return (
    <Box>
      <FormControl sx={{ minWidth: 195 }}>
        <InputLabel id="demo-simple-select-label">Bulk actions</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Bulk actions"
          value={buldAction}
          onChange={handleChange}
        >
            <MenuItem value={'bin'}>Move to bin</MenuItem>
            <MenuItem value={'processing'}>Change status to processing</MenuItem>
            <MenuItem value={'on_hold'}>Change status to on-hold</MenuItem>
            <MenuItem value={'completed'}>Change status to completed</MenuItem>
            <MenuItem value={'canceled'}>Change status to canceled</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Button onClick={handleApply}>
            apply
        </Button>
      </Box>
    </Box>
  );
}