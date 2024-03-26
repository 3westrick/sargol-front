import { getPermissions } from '@/api/admin/roles/roleAPI'
import { Box, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import RolePermissionTransferList from './components/RolePermissionTransferList'

const RoleForm = () => {
    const {register} = useFormContext()

    return (
        <Box>
            <Box>
                <TextField {...register('name')} size='small' label='Name'/>
            </Box>

            <Box mt={3}>
                <RolePermissionTransferList/>
            </Box>
            
        </Box>
    )
}

export default RoleForm
