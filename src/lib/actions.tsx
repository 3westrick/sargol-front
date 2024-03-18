'use server'
 
import { signIn } from '@/lib/auth'
import { DEFAULT_LOGGED_IN_REDIRECT, DEFAULT_LOGIN_PAGE } from '@/lib/routes';
import axios from 'axios'
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';


export async function authenticate({email, password}: {email: string, password: string}) {
    console.log(email)
    try{
        await signIn('credentials',{
            email: email,
            password: password,
            redirectTo: DEFAULT_LOGGED_IN_REDIRECT
        })
    }catch (error){
        if (error instanceof AuthError){
            console.log(1234,error.cause)
            switch(error.type){
                case "CredentialsSignin": return {error: "Invalid Credentials"}
                default: return {error: "Email or Password is wrong!"}
            }
        }
        throw error
    }
}

export async function register({username, email, password, password_confirm}: {
    username: string, email: string, password: string, password_confirm: string
}) {
    const response = await axios.post('http://127.0.0.1:8000/register/',{
        username,
        email,
        password,
        password_confirm
    })
    if (response.status == 201){
        redirect(DEFAULT_LOGIN_PAGE)
    }else{
        return {error: response.data.response.data}
    }
}

