import MyAccordion from '@/components/admin/MyAccordion'
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

const WidgetPrice = ({widget}: {widget: any}) => {
    return (
        <MyAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <Typography>Filter product by price</Typography>
            </AccordionSummary>
            <AccordionDetails>
                aa
            </AccordionDetails>
        </MyAccordion>
    )
}

export default WidgetPrice
