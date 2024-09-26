import MyAccordion from '@/components/admin/MyAccordion'
import { AccordionDetails, AccordionSummary, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateWidget } from '@/api/admin/widgets/widgetAPI';

const WidgetCategory = ({widget}: {widget: any}) => {

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
                <Typography>Filter product by category</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    <form onSubmit={handleSubmit(handle_submit)}>
                        <Box display={'flex'} gap={3}>
                            <Box>
                                <TextField {...register('title')} size='small' variant='standard' label={'Title'}/>
                            </Box>
                            <Box>
                                <FormControl sx={{width:300}} variant='standard' size="small">
                                <InputLabel id="demo-simple-select-label">Display</InputLabel>
                                    <Controller
                                        control={control}
                                        name={'display'}
                                        // rules={{ required: "Recipe picture is required" }}
                                        render={({ field: { value, onChange, ...field } }) => {
                                        return (
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label={'Display'}
                                            value={value}
                                            onChange={(event)=> onChange(event.target.value)}
                                            >
                                            {[
                                                {value: 'list', label: 'List'},
                                                {value: 'dropdown', label: 'Dropdown'},
                                            ].map((opt, index) => (
                                                <MenuItem key={index} value={opt.value}>{opt.label}</MenuItem>
                                            ))}
                                            </Select>
                                            )
                                        }
                                    }
                                    /> 
                                </FormControl>
                            </Box>
                        </Box>
                        <Box mt={3}>
                            <Button type='submit' variant='contained' sx={{textTransform: 'unset'}}>
                                Submit
                            </Button>
                        </Box>
                    </form>
                    
                </Box>
            </AccordionDetails>
        </MyAccordion>
    )
}

export default WidgetCategory
