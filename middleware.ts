
import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/notes'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;


  const isPrivate = privateRoutes.some((p) => pathname.startsWith(p));
  if (!isPrivate) return NextResponse.next();


  const cookie = req.headers.get('cookie') ?? '';

  try {
    
    const res = await fetch(new URL('/api/auth/session', req.url), {
      method: 'GET',
      headers: cookie ? { cookie } : undefined,
      cache: 'no-store',
    });

 
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      const next = NextResponse.next();
      next.headers.append('set-cookie', setCookie);
      if (res.ok) return next; // авторизован
      const loginUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(loginUrl, { headers: next.headers });
    }

   
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data?.success) return NextResponse.next();
    }
  } catch (e) {
  
    console.error('middleware session check error:', e);
  }

 
  const url = req.nextUrl.clone();
  url.pathname = '/sign-in';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*'],
};
