import type { User } from '@/app/lib/definitions'
import NextAuth from 'next-auth'
import * as fs from 'node:fs'
import path from 'node:path'
import { authConfig } from './auth.config'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import Credentials from 'next-auth/providers/credentials'

async function getUser(email: string): Promise<User | undefined> {
  try {
    const filePath = path.resolve(process.cwd(), 'app/lib/users.json')
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as User[]
    return users.find(user => user.email === email)
  }
  catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
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
