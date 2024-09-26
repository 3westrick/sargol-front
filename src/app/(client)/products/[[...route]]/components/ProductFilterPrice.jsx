import { client_products_query } from '@/Atoms'
import { Box, Button, Slider, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import {debounce} from '@mui/material/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { url_query } from '@/utils/urls'

const ProductFilterPrice = ({widget,max_price}) => {
    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams()  

    const m_price = max_price > 500 ? max_price : 500
    const [queries, setQueries] = useAtom(client_products_query)
    const [higher_price, setHigher] = useState(queries.price_lte == '' ? m_price : parseInt(queries.price_lte))
    const [lower_price, setLower] = useState(queries.price_gte == '' ? 0 : parseInt(queries.price_gte))

    const requ = React.useMemo(
        () =>
          debounce(
            (a,b) => {
                if(a == 0) a = ''
                if(b == m_price) b = ''
                setQueries({...queries, price_lte: b.toString(), price_gte: a.toString()});
                url_query('', 'page',pathname, router, searchParams, false)

            },
            500,
          ),
        [],
    );

    const my_debounce = React.useMemo(
        () =>
          debounce(
            (my_fun) => {
                my_fun()
            },
            500,
          ),
        [m_price, queries, setQueries],
    );
    

    const handleChange = (event, newValue) => {
        setLower(newValue[0])
        setHigher(newValue[1])
        if(!widget.show){
            requ(newValue[0], newValue[1])
        }
        
    };
    
    function handleFirst(e){
        const data = parseInt(e.target.value)
        if(isNaN(data)) return
        if (data > parseInt(higher_price)) {
            setLower(higher_price)
            setHigher(data)
            if (!widget.show){
                my_debounce(() => {
                    setQueries({...queries, price_lte: data.toString(), price_lte: higher_price});
                })
            }
        }
        else {
            setLower(data)
            setHigher(higher_price)
            if (!widget.show){
                my_debounce(() => {
                    setQueries({...queries, price_lte: higher_price, price_gte: data.toString()});
                })
            }

        }
    }
    
    function handleLast(e){
        // const data = parseInt(e.target.value)
        // if (data < parseInt(lower)) setQueries({...queries, price_lte: data.toString(), price_gte: lower});
        // else setQueries({...queries, price_lte: lower, price_gte: data.toString()});
        const data = parseInt(e.target.value)
        if(isNaN(data)) return
        if (data < parseInt(lower_price)) {
            setLower(data)
            setHigher(lower_price)
            if (!widget.show){
                my_debounce(() => {
                    setQueries({...queries, price_lte: lower_price, price_lte: data.toString()});
                }) 
            }
        }
        else {
            setLower(lower_price)
            setHigher(data)
            if (!widget.show){
                my_debounce(() => {
                    setQueries({...queries, price_lte: data.toString(), price_gte: lower_price});
                })
            }

        }
    }
    
    function handleClick(){
        setQueries({...queries, price_lte: higher_price, price_gte: lower_price});
    }
    
    // id: 4,
    // title: 'Price',
    // group: 1,
    // type: 'price',
    // attribute: null,
    // display: 'list',
    // categories: null,
    // show: true,
    // selector: 'editable'

    return (
        <Box sx={{width: 195}}>
            <Slider
                getAriaLabel={() => 'Price'}
                value={[lower_price, higher_price]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={m_price}
            />
            <Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <TextField size='small' value={lower_price} disabled={widget.selector == 'text'} onChange={handleFirst}/>
                    <TextField size='small' value={higher_price} disabled={widget.selector == 'text'} onChange={handleLast}/>
                </Box>
            </Box>

            {
                widget.show && <Box>
                    <Button variant='contained' onClick={()=>handleClick()}>Change</Button>
                </Box>
            }

        </Box>
    )
}

export default ProductFilterPrice
