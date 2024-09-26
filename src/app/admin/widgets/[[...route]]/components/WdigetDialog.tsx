import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, ButtonBase, Grid, IconButton, Paper, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWidget } from '@/api/admin/widgets/widgetAPI';

export default function WdigetDialog({open, setOpen} : {open: boolean, setOpen: any}) {
    const ClientQuery = useQueryClient()
    const create_widget = useMutation({
        mutationFn: (data:any) => createWidget(data),
        onSuccess: (res) => {
            ClientQuery.invalidateQueries({
                queryKey: ['admin-widgets']
            })
            setOpen(false)
        }
    })

  const handleAttribute = () => {
    create_widget.mutate({
        group: 1,
        title: '',
        type: 'attribute',
    })
  };
  const handleCategory = () => {
    create_widget.mutate({
        group: 1,
        title: '',
        type: 'category',
    })
  };
  const handlePrice = () => {
    create_widget.mutate({
        group: 1,
        title: '',
        type: 'price',
    })
  };
  const handleRating = () => {
    create_widget.mutate({
        group: 1,
        title: '',
        type: 'rating',
    })
  };

  const div_width = 150

    return (
        <Dialog
        sx={{display: 'block'}}
        open={open}
        onClose={() => setOpen(false)}
        >
        
            <Box p={3}>
                <Box display={'flex'}>
                    <IconButton onClick={() => setOpen(false)} sx={{ml:'auto'}}>
                        <CancelIcon/>
                    </IconButton>
                </Box>

                <Box mt={2}>
                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                        <Box display={'flex'} gap={2}>
                            <Box width={div_width}>
                                <Box >
                                    <ButtonBase onClick={handleAttribute}>
                                        <Box bgcolor={'grey.200'} borderRadius={4} p={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                            <Box>
                                                <FilterAltIcon sx={{fontSize: 64}}/>
                                            </Box>
                                            <Typography textAlign={'center'} alignSelf={'center'}>
                                            Filter Products by Attribute
                                            </Typography>
                                        </Box>
                                    </ButtonBase>
                                </Box>
                            </Box>
                        
                            <Box width={div_width}>
                                <Box>
                                    <ButtonBase onClick={handleCategory}>
                                        <Box bgcolor={'grey.200'} borderRadius={4} p={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                            <Box>
                                                <FilterAltIcon sx={{fontSize: 64}}/>
                                            </Box>
                                            <Typography textAlign={'center'} alignSelf={'center'}>
                                            Filter Products by Category
                                            </Typography>
                                        </Box>
                                    </ButtonBase>
                                </Box>
                            </Box>
                        </Box>
                        
                        <Box display={'flex'} gap={2}>
                            <Box width={div_width}>
                                <Box>
                                    <ButtonBase onClick={handlePrice}>
                                        <Box bgcolor={'grey.200'} borderRadius={4} p={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                            <Box>
                                                <FilterAltIcon sx={{fontSize: 64}}/>
                                            </Box>
                                            <Typography textAlign={'center'} alignSelf={'center'}>
                                            Filter Products by Price
                                            </Typography>
                                        </Box>
                                    </ButtonBase>
                                </Box>
                            </Box>
        
                            <Box width={div_width}>
                                <Box>
                                    <ButtonBase onClick={handleRating}>
                                        <Box bgcolor={'grey.200'} borderRadius={4} p={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                            <Box>
                                                <FilterAltIcon sx={{fontSize: 64}}/>
                                            </Box>
                                            <Typography textAlign={'center'} alignSelf={'center'}>
                                            Filter Products by Rating
                                            </Typography>
                                        </Box>
                                    </ButtonBase>
                                </Box>
                            </Box>
                        </Box>

                    </Box>

                </Box>

            </Box>
        </Dialog>
  );
}