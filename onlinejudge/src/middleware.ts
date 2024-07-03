import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"




// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/signIn',
    '/signup',
    '/',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
}


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const token = await getToken({req:request, secret: process.env.NEXTAUTH_SECRET_KEY})
  // console.log("Token is here middlewear" , token);
  const url = request.nextUrl

  if (
    token &&
    (url.pathname.startsWith('/signIn') ||
      url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/verify') )
  ){
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if(!token && (
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/createnewproblem') ||
    url.pathname.startsWith('/editProblemui') 
  )){
    return NextResponse.redirect(new URL('/signIn', request.url))
  }

  
  return NextResponse.next();
}
 
