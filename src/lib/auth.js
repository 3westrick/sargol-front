import NextAuth from "next-auth"
import authConfig from "@/lib/auth.config"
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: 'jwt'
  },
  trustHost: true,
  ...authConfig
})

