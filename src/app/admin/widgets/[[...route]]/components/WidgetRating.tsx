import MyAccordion from '@/components/admin/MyAccordion'
import { AccordionDetails, AccordionSummary, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateWidget } from '@/api/admin/widgets/widgetAPI';


const WidgetRating = ({widget}: {widget: any}) => {

    const methods = useForm({
        defaultValues: {
            title: widget.title,
            group: widget.group,
            type: widget.type,
            attribute: widget.attribute,
            display: widget.display,
        }
    })

    const update_widget = useMutation({
        mutationFn: (data: any) => updateWidget(widget.id, data),
        onSuccess: (res) => {
            console.log(res)
        }
    })

    function handle_submit(data: any){
        update_widget.mutate(data)
    }


    const {register, handleSubmit, control} = methods

    return (
        <MyAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{p:1}} >
                <Typography>Filter product by rating</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    <form onSubmit={handleSubmit(handle_submit)}>
                        <Box display={'flex'} gap={3}>
                            <Box>
                                <TextField {...register('title')} size='small' variant='standard' label={'Title'}/>
                            </Box>
                            <Box>
                                <Button type='submit' variant='contained' sx={{textTransform: 'unset'}}>
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </form>

                    <Box mt={3}>
                        <Typography color={'gray'}>
                            This filter displays a list of star ratings to filter products in your store
                        </Typography>
                    </Box>
                    
                </Box>
            </AccordionDetails>
        </MyAccordion>
    )
}

export default WidgetRating
