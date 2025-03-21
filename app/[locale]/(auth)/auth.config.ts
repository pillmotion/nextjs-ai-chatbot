import type { NextAuthConfig } from 'next-auth';
import { createI18nMiddleware } from 'next-international/middleware';
import type { NextRequest } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
});

function handleI18n(request: NextRequest) {
  const response = I18nMiddleware(request);
  return response || true;
}

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnChat = request.nextUrl.pathname.startsWith('/');
      const isOnRegister = request.nextUrl.pathname.startsWith('/register');
      const isOnLogin = request.nextUrl.pathname.startsWith('/login');

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', request.nextUrl));
      }

      if (isOnRegister || isOnLogin) {
        return handleI18n(request as NextRequest);
      }

      if (isOnChat) {
        if (isLoggedIn) {
          return handleI18n(request as NextRequest);
        }
        return false; // Redirect unauthenticated users to login page
      }

      if (isLoggedIn) {
        return Response.redirect(new URL('/', request.nextUrl));
      }

      return handleI18n(request as NextRequest);
    },
  },
} satisfies NextAuthConfig;
