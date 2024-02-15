import { NextResponse } from 'next/server'

 

export function middleware(request) {
  // 리다이렉트 조건
  if (
    !request.cookies.get("session-id")
  ) {
    return NextResponse.redirect(new URL("/i/login", request.url));
  }
}
 

export const config = {
  // 이 Middleware가 동작할 경로들을 추가해주면된다.
  matcher: '/(afterlogin)/:path*',
}