'use client'
import { getWidgets } from '@/api/admin/widgets/widgetAPI'
import MyAccordion from '@/components/admin/MyAccordion'
import { AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WidgetAttribute from './components/WidgetAttribute'
import WidgetCategory from './components/WidgetCategory'
import WidgetPrice from './components/WidgetPrice'
import WidgetRating from './components/WidgetRating'

const WidgetList = () => {
    const widgets_query = useQuery({
        queryKey: ['admin-widgets'],
        queryFn:() => getWidgets(),
    })

    return (
        <Box>
            <MyAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography>Shop page widget area</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    {widgets_query.data[0].widgets.map((widget: any) => {
                        if (widget.type == 'attribute') return <WidgetAttribute key={widget.id} widget={widget}/>
                        else if (widget.type == 'category') return <WidgetCategory key={widget.id} widget={widget}/>
                        else if (widget.type == 'price') return <WidgetPrice key={widget.id} widget={widget}/>
                        else if (widget.type == 'rating') return <WidgetRating key={widget.id} widget={widget}/>
                    })}
                </AccordionDetails>

            </MyAccordion>
        </Box>
    )
}

export default WidgetList
