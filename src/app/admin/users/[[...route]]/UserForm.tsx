import { Box, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import UserPermissionTransferList from './components/UserPermissionTransferList'
import UserRoleTransferList from './components/UserRoleTransferList'

const UserForm = () => {
    const {register, watch, setValue} = useFormContext()
    return (
        <Box>
            <Box>
                <TextField fullWidth {...register('username')} label={'Username'}/>
            </Box>

            <Box mt={3}>
                <TextField fullWidth {...register('first_name')} label={'First name'}/>
            </Box>

            <Box mt={3}>
                <TextField fullWidth {...register('last_name')} label={'Last name'}/>
            </Box>

            <Box mt={3}>
                <TextField fullWidth {...register('phone')} label={'Phone'}/>
            </Box>

            <Box mt={3}>
                <TextField fullWidth {...register('country')} label={'Country'}/>
            </Box>
            <Box mt={3}>
                <TextField fullWidth {...register('city')} label={'City'}/>
            </Box>
            <Box mt={3}>
                <TextField fullWidth {...register('address')} label={'Address'}/>
            </Box>
            <Box mt={3}>
                <TextField fullWidth {...register('post_code')} label={'Post code'}/>
            </Box>

            <Box mt={3}>
                <TextField type='password' fullWidth {...register('password')} label={'Password'}/>
            </Box>

            <Box mt={3}>
                <TextField type='email' fullWidth {...register('email')} label={'Email'}/>
            </Box>

            <Box mt={3}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={watch('is_staff')} onChange={(e) => setValue('is_staff', e.target.checked)}/>} label="Is staff" />
                </FormGroup>
            </Box>

            <Box mt={3}>
                <UserPermissionTransferList/>
            </Box>

            <Box mt={3}>
                <UserRoleTransferList/>
            </Box>

            
        </Box>
    )
}

export default UserForm
