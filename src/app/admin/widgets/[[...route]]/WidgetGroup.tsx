import { Box, IconButton, Paper, Typography } from '@mui/material'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import React from 'react'
import WidgetAttribute from './components/WidgetAttribute';
import WidgetCategory from './components/WidgetCategory';
import WidgetPrice from './components/WidgetPrice';
import WidgetRating from './components/WidgetRating';
import ShopPageWidgetArea from './ShopPageWidgetArea';

const WidgetGroup = ({widget_group}: {widget_group: any}) => {
    if (widget_group.slug == 'shop_page_widget_area'){
        return <ShopPageWidgetArea widgets={widget_group.widgets}/>
    }
    return <></>
        
    // return (
    //     <Paper elevation={4} >
    //         <Box sx={{width: '100%'}} display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={2}>
    //             <Typography>Shop page widget area</Typography>

    //             {/* <IconButton onClick={() => setOpen(true)}>
    //                 <WidgetsRoundedIcon/>
    //             </IconButton> */}

    //             <Box p={2}>
    //                 {widget_group.widgets.map((widget: any) => {
    //                     if (widget.type == 'attribute') return <WidgetAttribute key={widget.id} widgets={widget}/>
    //                     else if (widget.type == 'category') return <WidgetCategory key={widget.id} widget={widget}/>
    //                     else if (widget.type == 'price') return <WidgetPrice key={widget.id} widget={widget}/>
    //                     else if (widget.type == 'rating') return <WidgetRating key={widget.id} widget={widget}/>
    //                 })}
    //             </Box>  
    //         </Box>
    //     </Paper>
    // )
}

export default WidgetGroup
