import MyAccordion from '@/components/admin/MyAccordion'
import { AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import CustomeSlider from './CustomeSlider';
import CustomeSwitch from './CustomeSwitch';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateWidget } from '@/api/admin/widgets/widgetAPI';

const WidgetPrice = ({widget}: {widget: any}) => {
    const methods = useForm({
        defaultValues: {
            title: widget.title,
            group: widget.group,
            type: widget.type,
            attribute: widget.attribute,
            display: widget.display,
            show: widget.show,
            selector: widget.selector
        }
    })

    const {register, handleSubmit, control, getValues, watch} = methods

    const update_widget = useMutation({
        mutationFn: (data: any) => updateWidget(widget.id, data),
        onSuccess: (res) => {
            console.log(res)
        }
    })

    function handle_submit(data: any){
        update_widget.mutate(data)
    }

    return (
        <MyAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{p:1}} >
                <Typography>Filter product by price</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box p={2}>
                    <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(handle_submit)}>
                    
                    <TextField {...register('title')} size='small' variant='standard' label={'Title'}/>

                    <Box mt={3}>
                        <CustomeSlider disabled={watch('selector') == 'text'}/>
                    </Box>
                    <Box mt={5}>
                        <Box display={'flex'}>
                            <Box sx={{flex:'40%'}}>
                                <CustomeSwitch/>
                            </Box>
                            <Box sx={{flex:'40%'}}>
                                <Controller
                                control={control}
                                name='selector'
                                render={({field: {value, onChange}}) => {
                                    return (
                                        <ButtonGroup variant="contained" aria-label="Basic button group">
                                            <Button color={value=='editable' ? 'inherit' : 'primary'} onClick={() => onChange('text')} sx={{width: 150}}>Text</Button>
                                            <Button color={value=='text' ? 'inherit' : 'primary'} onClick={() => onChange('editable')} sx={{width: 150}}>Editable</Button>
                                        </ButtonGroup>
                                    )
                                }}
                                />
                            </Box>
                        </Box>
                        <Box mt={3}>
                            <Button type='submit' variant='contained' sx={{textTransform: 'unset'}}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                    </form>
                    </FormProvider>
                </Box>
            </AccordionDetails>
        </MyAccordion>
    )
}

export default WidgetPrice
