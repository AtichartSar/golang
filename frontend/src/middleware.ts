import { NextRequest, NextResponse } from 'next/server';
import { deCodeToken } from './service/token';
import { Role, getPermission, getPrivateRoute } from './config/permission';

export async function middleware(request: NextRequest, res: NextResponse) {
  const path = request.nextUrl.pathname;

  if (!getPrivateRoute.some((menuPath) => path.startsWith(menuPath))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('access_token')?.value;
  console.log('accessToken', accessToken);

  if ((!accessToken && path === '/') || !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decodeToken = deCodeToken(accessToken);
  if (![Role.CUSTOMER, Role.ADMIN].includes(decodeToken?.payload?.role)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  console.log('path', request.nextUrl.pathname);

  const role = decodeToken?.payload?.role;

  console.log(
    'cantpath',
    getPermission[role].menu.some((menuPath) => path.startsWith(menuPath))
  );

  if (!getPermission[role].menu.some((menuPath) => path.startsWith(menuPath))) {
    return NextResponse.redirect(new URL(getPermission[role].defaultPath, request.url));
  }
  return NextResponse.next();
  //   if()

  // console.log("request",request.cookies.get('access_token').value);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
