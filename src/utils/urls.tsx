"use client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";

function change_url(){
    
}

export function url_query(data: string| string[], queryname: string| string[] ,pathname: string, router: AppRouterInstance, searchParams: ReadonlyURLSearchParams, replace: boolean = false){
    const params = new URLSearchParams(searchParams);

    data = `${data}`
    if (typeof data == 'string' && typeof queryname == 'string'){
        if (data != '') {
            params.set(queryname, data);
        } else {
            params.delete(queryname);
        }
        
        if (replace){
            router.replace(`${pathname}?${params.toString()}`);
        }else{
            router.push(`${pathname}?${params.toString()}`);
        }
    }else{
        for(let i = 0; i < data.length; i ++){
            if (data[i] != '') {
                params.set(queryname[i], data[i]);
            } else {
                params.delete(queryname[i]);
            }
            
            if (replace){
                router.replace(`${pathname}?${params.toString()}`);
            }else{
                router.push(`${pathname}?${params.toString()}`);
            }
        }
    }

}

export function get_page(searchParams: ReadonlyURLSearchParams){
    var num: string | null | number = searchParams.get('page')
    if (num){
      num = parseInt(num)
      if (isNaN(num)){
        return 1
      }else {
        return num
      }
    }
    return 1
  }
    