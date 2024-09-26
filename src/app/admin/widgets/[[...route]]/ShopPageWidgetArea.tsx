import React from 'react'
import WidgetAttributes from './components/WidgetAttributes'

const ShopPageWidgetArea = ({widgets}: {widgets: any}) => {
    // console.log(widgets)
    
    return (
        widgets.map((widget: any) => {
            if (widget.main){
                if (widget.option == 'attribute') return <WidgetAttributes key={widget.id} attribute_id={widget.value} widgets={widgets}/>
            }
        })
    )
}

export default ShopPageWidgetArea
