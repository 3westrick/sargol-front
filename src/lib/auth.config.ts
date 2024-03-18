import Credentials from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import dayjs from "dayjs"
export default {
    providers: [
        Credentials({
            id: "credentials",
            name: "credentials",
            credentials:{
                email: { label: "Email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password" },
                username: {label: "Username", type: "text", placeholder: "username"}
            },
            authorize: async (credentials) => {
                const token = await axios.post('http://127.0.0.1:8000/token/',{
                    email: credentials['email'],
                    password: credentials['password'],
                },
                )
                .then((response) => response.data)
                .catch((error) => {
                    throw error
                })
                
                if (token.detail) return null
                const user = jwtDecode(token.access)
                return {
                    id: user.user_id,
                    exp: user.exp,
                    username: user.username,
                    email: user.email,
                    access: token.access,
                    refresh: token.refresh,
                    role: user.role,
                }
            }
        })
    ],
    callbacks:{
        async session({ session, token }) {
            
            if(session.user) session.user = token.user

            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user){
                token.user = user
            }

            const isExpired = dayjs.unix(token.user.exp).diff(dayjs()) < 1;

            if(!isExpired)return token

            const response = await fetch('http://127.0.0.1:8000/token/refresh/',{
                method: 'post',
                body: JSON.stringify({refresh: token.user.refresh}),
                headers: {
                'Content-Type': 'application/json',
                }
            })
            if (response.status == 200){
                const temp_token = await response.json()
                const temp_user = jwtDecode(temp_token.access)
                token.user = {
                    id: temp_user.user_id,
                    exp: temp_user.exp,
                    username: temp_user.username,
                    email: temp_user.email,
                    role: temp_user.role,
                    access: temp_token.access,
                    refresh: temp_token.refresh,
                }
            }else{
                throw new Error("Something Went Wrong")
            }
            return token
        }
    },
    jwt: { secret: process.env.JWT_SECRET, },
} satisfies NextAuthConfig
