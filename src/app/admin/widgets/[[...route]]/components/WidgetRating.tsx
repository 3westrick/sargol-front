import MyAccordion from '@/components/admin/MyAccordion'
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

const WidgetRating = ({widget}: {widget: any}) => {
    return (
        <MyAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <Typography>Filter product by rating</Typography>
            </AccordionSummary>
            <AccordionDetails>
                aa
            </AccordionDetails>
        </MyAccordion>
    )
}

export default WidgetRating
