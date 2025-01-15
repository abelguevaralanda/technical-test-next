'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData)
  }
  catch (error) {
    if (error instanceof AuthError) {
      const errorMessages: Record<string, string> = {
        CredentialsSignin: 'Invalid credentials.',
      }

      return errorMessages[error.type] || 'Something went wrong.'
    }
    throw error
  }
}
