"use client"
import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue){
    const [value, setValue] = useState(()=>{
        const jsonValue = typeof window != 'undefined' ? window.localStorage.getItem(key) : null
        if (jsonValue != null) 
            if(jsonValue.length != 0)
                return JSON.parse(jsonValue)
            else
                return initialValue
        
        if (typeof initialValue === 'function'){
            return initialValue()
        }else{
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}