import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import React from 'react'
import UserList from './UserList'
import UserCreate from './UserCreate'
import { notFound } from 'next/navigation'
import { getPermissions, getRoles } from '@/api/admin/roles/roleAPI'
import { getUser, getUsers } from '@/api/admin/users/userAPI'
import UserEdit from './UserEdit'

const UsersPage = async ({params}: {
    params:{
        route: [string, number] | [string]
    }
}) => {

    const queryClient = new QueryClient()
    

    if (params.route == undefined){
        await queryClient.prefetchQuery({
            queryKey: ['admin-users', {query: "", field: "", order: "", limit: 10, offset: 0}],
            queryFn:() => getUsers("", "", "", 10, 0),
        })
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <UserList/>
            </HydrationBoundary>
          )
    }

    if (params.route.length == 1 && params.route[0] == 'create'){
            
        await queryClient.prefetchQuery({
            queryKey: ['admin-permissions'],
            queryFn: () => getPermissions()
        })
        await queryClient.prefetchQuery({
            queryKey: ['admin-roles'],
            queryFn: () => getRoles()
        })

        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <UserCreate/>
            </HydrationBoundary>
        )
    }

    if (params.route.length == 2 && params.route[0] == 'edit'){
        await queryClient.prefetchQuery({
            queryKey: ['admin-permissions'],
            queryFn: () => getPermissions()
        })
        await queryClient.prefetchQuery({
            queryKey: ['admin-roles'],
            queryFn: () => getRoles()
        })
        await queryClient.prefetchQuery({
            queryKey: ['admin-users', params.route[1]],
            queryFn: () => getUser(params.route[1]?? 0)
        })
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <UserEdit userId={params.route[1]}/>
            </HydrationBoundary>
        )
    }

    notFound();
}

export default UsersPage
