import MyAccordion from '@/components/admin/MyAccordion'
import { AccordionDetails, AccordionSummary, Paper, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

const WidgetCategory = ({widget}: {widget: any}) => {
    return (
        <MyAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <Typography>Filter product by category</Typography>
            </AccordionSummary>
            <AccordionDetails>
                aa
            </AccordionDetails>
        </MyAccordion>
    )
}

export default WidgetCategory
