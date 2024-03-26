import { getPermissions, getRole, getRoles, getRolesList } from '@/api/admin/roles/roleAPI'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import RolesCreate from './RolesCreate'
import RolesList from './RolesList'
import { notFound } from 'next/navigation'
import RolesEdit from './RolesEdit'

const RolesPage = async ({params}: {
    params:{
        route: [string, number]
    }
}) => {

    const queryClient = new QueryClient()
    
    await queryClient.prefetchQuery({
        queryKey: ['admin-permissions'],
        queryFn: () => getPermissions()
    })

    if (params.route?.length == 2 && params.route[0].toLowerCase() == 'edit') {
        await queryClient.prefetchQuery({
            queryKey: ['admin-roles', params.route[1]],
            queryFn: () => getRole(params.route[1]),
        })
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <RolesEdit roleId={params.route[1]}/>
            </HydrationBoundary>
          )
    }else

    if (params.route && params.route[0].toLowerCase() == 'create') {
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <RolesCreate/>
            </HydrationBoundary>
          )
    }else

    if (params.route == undefined){
            
        await queryClient.prefetchQuery({
            queryKey: ['admin-roles', {query: "", field: "", order: "", limit: 10, offset: 0}],
            queryFn: () => getRolesList("", "", "", 10, 0)
        })
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <RolesList/>
            </HydrationBoundary>
          ) 
    }

    notFound()
}

export default RolesPage
