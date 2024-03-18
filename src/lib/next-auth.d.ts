import NextAuth, {DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    exp: Date,
    username: string,
    email: string,
    user_id: int,
    access: string,
    refresh: string,
    role: boolean
}

declare module "next-auth"{
    interface Session{
        user: ExtendedUser
    }
}

