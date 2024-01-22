import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateTokens } from 'http/accountService/accountService';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;

    const reqCookie = request.cookies;

    const access = reqCookie.get('access')?.value;
    const refresh = reqCookie.get('refresh')?.value;

    const itsLogin = url.pathname.startsWith('/login');

    if (!access && !itsLogin)
        return NextResponse.redirect(new URL('/login', request.url));

    if (access) {
        const parsedMiddleJwt = JSON.parse(atob(access.split('.')[1]));

        const expireDate = new Date(parsedMiddleJwt.exp * 1000);

        const isTokenExpired = expireDate < new Date();

        if (isTokenExpired) {
            const updatedSuccessfully = await updateTokens(refresh as string);

            if (updatedSuccessfully) {
                request.cookies.set('access', updatedSuccessfully.access);
                request.cookies.set('refresh', updatedSuccessfully.refresh);
                if (itsLogin)
                    return NextResponse.redirect(new URL('/', request.url));
            } else {
                if (itsLogin) {
                    return;
                }
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } else {
            if (itsLogin)
                return NextResponse.redirect(new URL('/', request.url));
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
