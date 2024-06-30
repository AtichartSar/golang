import { NextRequest, NextResponse } from 'next/server';
import { deCodeToken } from './service/token';
import { Role, getPermission, getPrivateRoute } from './config/permission';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log('path', path);

  if (path === '/login') {
    return NextResponse.next();
  }
  const accessToken = request.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decodeToken = deCodeToken(accessToken);
  if (![Role.CUSTOMER, Role.ADMIN].includes(decodeToken?.payload?.role)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const role = decodeToken?.payload?.role;

  if (path === '/') {
    return NextResponse.redirect(new URL(getPermission[role].defaultPath, request.url));
  }

  console.log(
    'cantpath',
    getPermission[role].menu.some((menuPath) => path.startsWith(menuPath))
  );

  if (!getPermission[role].menu.some((menuPath) => path.startsWith(menuPath))) {
    return NextResponse.redirect(new URL(getPermission[role].defaultPath, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
