import NextAuth from 'next-auth';

import { authConfig } from '@/app/[locale]/(auth)/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/((?!_next|api/auth|.*\\..*).*)'],
};
