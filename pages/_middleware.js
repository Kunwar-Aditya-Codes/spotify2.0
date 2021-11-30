import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  // Allow request if following is true
  // 1.request for next auth session
  // 2.token exist
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // No token redirect to login
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
}
