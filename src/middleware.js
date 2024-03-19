import authConfig from "./lib/auth.config.js"
import NextAuth from "next-auth"


import {
  DEFAULT_LOGGED_IN_REDIRECT,
  DEFAULT_LOGIN_PAGE,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  adminPrefic,
} from '@/lib/routes'

const {auth} = NextAuth(authConfig)

export default auth(async (req) => {
  
  const {nextUrl} = req
  const isLoggedIn = !!req.auth
  
  const isAdmin = req.auth?.user?.role
  
  const isAdminRoute = nextUrl.pathname.startsWith(adminPrefic);
  
  if (isAdminRoute && !isAdmin){
    return Response.redirect(new URL(DEFAULT_LOGIN_PAGE, nextUrl))
  }


  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;

  if (isAuthRoute){
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LOGGED_IN_REDIRECT, nextUrl));
    return null;
  }
  
  // protected | need auth path
  if (!isLoggedIn && !isPublicRoute) return Response.redirect(new URL(DEFAULT_LOGIN_PAGE, nextUrl))

  
  return null
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ['/login']
}