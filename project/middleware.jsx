import { NextResponse } from 'next/server'

// 최초 요청에 대한 처리
export function middleware(request) {
  // 세션 확인
  if (!request.cookies.has("token")&&request.url!=='/i/:path*') {
    console.log("Token not found");
    // 토큰이 없으면 로그인 페이지로 리디렉션
    return NextResponse.redirect(new URL("/i/login", request.url));
  } else if(request.cookies.has("token")&&request.url==='/i/:path*') {
    console.log("Token found");
    // 토큰이 있으면 홈 페이지로 리디렉션
    return NextResponse.redirect(new URL("/home", request.url));
  }
  else return
}

// 두 번째 요청부터는 직접적인 미들웨어 처리를 하지 않음
export function onRequest(request) {
  return request;
}

export const config = {
  // 이 Middleware가 동작할 경로들을 추가해주면된다.
  matcher: [
    '/home/:path*',
    '/vote/:path*',
    '/',
    '/review/:path*',
    '/menu/:path*',
]
}