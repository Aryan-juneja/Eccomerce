import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/admin/:path*', '/sign-in', '/sign-up', '/Products'],
};

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const url = request.nextUrl.clone();

  // Check if the user has a valid token and if their role is not 'admin'
  if (token && token.role !== 'admin' && url.pathname.startsWith('/admin')) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Redirect to home if the user is already authenticated
  // and trying to access sign-in or sign-up pages
  if (
    token &&
    (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up'))
  ) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Redirect to sign-in if the user is not authenticated and trying to access /Products
  if (!token && url.pathname.startsWith('/Products')) {
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
