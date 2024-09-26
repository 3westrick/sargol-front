import { Accordion } from '@mui/material'
import React from 'react'

const MyAccordion = ({children, ex=false}) => {
    const [expand, setExpand] = React.useState(ex);

    function handleChange(event, expanded) {
        // console.log(event.target.classList)
        // console.log(event.target.classList.value)
        const class_list = event.target.classList
        if(class_list.contains('MuiAccordionSummary-content')
        || class_list.contains('MuiStack-root')
        || class_list.contains('MuiAccordionSummary-root')
        || class_list.contains('MuiTypography-root')
        || class_list.contains('MuiSvgIcon-root')
        || event.target.classList.value == ''
        ) setExpand(n => !n)
    }

    return (
        <Accordion elevation={4} expanded={expand} onChange={handleChange}>
            {children}
        </Accordion>
    )
}

export default MyAccordion
