import MyAccordion from '@/components/admin/MyAccordion'
import { AccordionDetails, AccordionSummary, Box, Button, FormControl, FormLabel, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { getAttributes } from '@/api/admin/attributes/attributeAPI';
import WidgetSelectAttribute from './WidgetSelectAttribute';
import { updateWidget } from '@/api/admin/widgets/widgetAPI';

import WorkspacesIcon from '@mui/icons-material/Workspaces';

const WidgetAttribute = ({widgets}: {widgets: any}) => {
    
    const methods = useForm({
        defaultValues: {
            title: widget.title,
            group: widget.group,
            type: widget.type,
            attribute: widget.attribute,
            display: widget.display,
        }
    })

    const {register, handleSubmit, control} = methods


    const update_widget = useMutation({
        mutationFn: (data: any) => updateWidget(widget.id, data),
        onSuccess: (res) => {
            console.log(res)
        }
    })

    function handle_submit(data: any){
        data.attribute = data.attribute.id
        update_widget.mutate(data)
    }


    return (
        <MyAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{p:1}}>
                <Typography>Filter product by attribute</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    <form onSubmit={handleSubmit(handle_submit)}>
                        <Box display={'flex'} gap={3}>
                            <Box>
                                <TextField {...register('title')} size='small' variant='standard' label={'Title'}/>
                            </Box>
                            <Box>
                                <WidgetSelectAttribute control={control}/>
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

export default WidgetAttribute
