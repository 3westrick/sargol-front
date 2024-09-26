import MyAccordion from '@/components/admin/MyAccordion'
import { AccordionDetails, AccordionSummary, Box, Button, FormControl, FormLabel, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { getAttributes } from '@/api/admin/attributes/attributeAPI';
import WidgetSelectAttribute from './WidgetSelectAttribute';
import { updateWidget } from '@/api/admin/widgets/widgetAPI';
import { debounce } from '@mui/material/utils'
import WorkspacesIcon from '@mui/icons-material/Workspaces';

const WidgetAttributes = ({widgets, attribute_id}: {widgets: any, attribute_id:string}) => {
    
    const widget_attribute = widgets.find((w: any) => w.value == attribute_id)
    const widget_title = widgets.find((w: any) => w.option == `attribute-${attribute_id}-title`)
    const widget_display = widgets.find((w: any) => w.option == `attribute-${attribute_id}-display`)
    

    const methods = useForm({
        defaultValues:{
            attribute : widget_attribute.value,
            title : widget_title.value,
            display : widget_display.value,
        }
    })

    const {register, control, handleSubmit} = methods


    const update_widget = useMutation({
        mutationFn: (data: any) => updateWidget(data),
        onSuccess: (res) => {
            
        }
    })

    function handle_submit(data: any){
        update_widget.mutate({
            ...widget_attribute, value: data.attribute
        })
        update_widget.mutate({
            ...widget_title, option: `attribute-${data.attribute}-title`  ,value: data.title
        })
        update_widget.mutate({
            ...widget_display, option: `attribute-${data.attribute}-title`, value: data.display
        })
    }


    return (
        <MyAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{p:1}}>
                <Typography>Filter product by attribute</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={handleSubmit(handle_submit)}>
                <Box display={'flex'} gap={3} alignItems={'center'}>
                    <Box>
                        <TextField variant='standard' {...register('title')} label="title" size='small'/>
                    </Box>
                    <Box>
                        <WidgetSelectAttribute control={control}/>
                    </Box>
                    
                    <Box>
                        <FormControl sx={{width:195}} variant='standard' size="small">
                            <InputLabel id="demo-simple-select-label">Display</InputLabel>
                            <Controller
                                control={control}
                                name={'display'}
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

                    <Box>
                        <Button type='submit' variant='contained'>
                            Submit
                        </Button>
                    </Box>
                </Box>
                </form>
            </AccordionDetails>
        </MyAccordion>
    )
}

export default WidgetAttributes
