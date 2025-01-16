import type { User } from '@/app/lib/definitions'
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import Credentials from 'next-auth/providers/credentials'

async function getUser(email: string): Promise<User | undefined> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users`) // Llama a la API interna
    if (!response.ok) throw new Error('Failed to fetch users')

    const users = (await response.json()) as User[]
    return users.find(user => user.email === email)
  }
  catch (error) {
    throw new Error('Failed to fetch user.', error as Error)
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    async authorize(credentials) {
      const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials)

      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data
        const user = await getUser(email)
        if (!user) return null
        const passwordsMatch = await bcrypt.compare(password, user.password)

        if (passwordsMatch) return user
      }

      return null
    },
  }),
  ],
})
