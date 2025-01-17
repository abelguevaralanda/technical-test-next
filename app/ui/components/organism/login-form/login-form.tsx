'use client'

import { authenticate } from '@/app/lib/actions'
import { Button } from '@/app/ui/components/molecules/button/button'
import InputField from '@/app/ui/components/molecules/input-field/input-field'
import { abel } from '@/app/ui/fonts'
import React, { useActionState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { LuKeyRound } from 'react-icons/lu'
import { MdAlternateEmail } from 'react-icons/md'

const EMAIL_LABEL_TEXT = 'Email'
const EMAIL_PLACEHOLDER_TEXT = 'Enter your email'
const PASSWORD_LABEL_TEXT = 'Password'
const PASSWORD_PLACEHOLDER_TEXT = 'Enter your password'
const LOGIN_TITLE_TEXT = 'Please log in to continue.'
const LOGIN_BUTTON_TEXT = 'Log in'

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  )

  return (
    <form
      action={formAction}
      className="space-y-3"
    >
      <div className="flex-1 rounded-lg shadow-2xl bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${abel.className} mb-3 text-2xl`}>
          {LOGIN_TITLE_TEXT}
        </h1>
        <InputField
          inputType="email"
          placeholder={EMAIL_PLACEHOLDER_TEXT}
          label={EMAIL_LABEL_TEXT}
          icon={(
            <MdAlternateEmail
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
            />
          )}
        />
        <InputField
          inputType="password"
          placeholder={PASSWORD_PLACEHOLDER_TEXT}
          label={PASSWORD_LABEL_TEXT}
          icon={(
            <LuKeyRound
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
            />
          )}
        />
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          {LOGIN_BUTTON_TEXT}
          <FiLogIn className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  )
}
