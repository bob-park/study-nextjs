import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_VISITED = 'visited';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req });

  const response = NextResponse.next();

  // console.log(session);

  if (req.nextUrl.pathname.startsWith('/list')) {
    console.log(req.headers.get('sec-ch-ua-platform'));
  }

  // /write 페이지 접속시 인증이 되지 않을 경우 로그인 화면으로 redirect
  // ! jwt 방식만 사용가능
  // ! session 사용할 경우 직접 구현해야함
  if (req.nextUrl.pathname.startsWith('/write')) {
    if (!session) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }
  }

  // TODO 오늘 숙제 - 사용자가 /signup 페이지 방문시 visited=true 쿠키 생성
  if (req.nextUrl.pathname.startsWith('/signup')) {
    if (!req.cookies.has(COOKIE_VISITED)) {
      response.cookies.set({
        name: COOKIE_VISITED,
        value: 'true',
        maxAge: 3600,
        httpOnly: true,
      });
    }
  }

  // * middleware 사용 시 반드시 써주는 것이 좋음
  return response;
}
