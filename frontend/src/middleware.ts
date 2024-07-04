import { NextRequest, NextResponse } from 'next/server';
import { deCodeToken } from './service/token';
import { PageRoute, Role, getPermission, publicRoute } from './config/permission';
import { getCookie } from 'cookies-next';

export const validateAndGetTokenPayload = (accessToken: string | undefined) => {
  if (!accessToken) return null;
  try {
    const decoded = deCodeToken(accessToken);
    if ([Role.CUSTOMER, Role.ADMIN].includes(decoded.payload.role)) {
      return decoded.payload;
    }
  } catch (error) {
    console.error('Token validation error:', error);
  }
  return null;
};

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const accessToken = request.cookies.get('access_token')?.value;

  const payload = validateAndGetTokenPayload(accessToken as string);
  console.log('payload', payload);
  console.log('pathName', pathName);

  if (pathName === '/' && !payload) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
  }

  if (pathName === '/' && payload) {
    const response = NextResponse.redirect(
      new URL(getPermission[payload.role].defaultPath, request.url)
    );
    response.headers.set('x-middleware-cache', 'no-cache'); // Disables middleware caching
    return response;
  }

  return NextResponse.next();
}
