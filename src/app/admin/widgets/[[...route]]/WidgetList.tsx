'use client'
import { getWidgets } from '@/api/admin/widgets/widgetAPI'
import MyAccordion from '@/components/admin/MyAccordion'
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Paper, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WidgetAttribute from './components/WidgetAttribute'
import WidgetCategory from './components/WidgetCategory'
import WidgetPrice from './components/WidgetPrice'
import WidgetRating from './components/WidgetRating'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import WdigetDialog from './components/WdigetDialog'
import WidgetGroup from './WidgetGroup'

const WidgetList = () => {
    const [open, setOpen] = React.useState(false);


    const widgets_query = useQuery({
        queryKey: ['admin-widgets'],
        queryFn:() => getWidgets(),
    })

    // console.log(widgets_query.data)


    return (
        <Box>

            {widgets_query.data.map((widget_group: any) => <WidgetGroup key={widget_group.id} widget_group={widget_group}/>)}
            {/* <Paper elevation={4} >

                <Box sx={{width: '100%'}} display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={2}>
                    <Typography>Shop page widget area</Typography>
                    <IconButton onClick={() => setOpen(true)}>
                        <WidgetsRoundedIcon/>
                    </IconButton>
                </Box>
                <WdigetDialog open={open} setOpen={setOpen}/>

                <Box p={2}>
                    {widgets_query.data[0].widgets.map((widget: any) => {
                        if (widget.type == 'attribute') return <WidgetAttribute key={widget.id} widget={widget}/>
                        else if (widget.type == 'category') return <WidgetCategory key={widget.id} widget={widget}/>
                        else if (widget.type == 'price') return <WidgetPrice key={widget.id} widget={widget}/>
                        else if (widget.type == 'rating') return <WidgetRating key={widget.id} widget={widget}/>
                    })}
                </Box>

            </Paper> */}
        </Box>
    )
}

export default WidgetList
