import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnMovies = nextUrl.pathname.startsWith('/movies')

      if (isOnMovies) {
        return isLoggedIn
      }

      if (isLoggedIn) {
        return Response.redirect(new URL('/movies', nextUrl))
      }
      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
