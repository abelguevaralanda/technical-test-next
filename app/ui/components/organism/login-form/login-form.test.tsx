import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LoginForm from './login-form'
import { authenticate } from '@/app/lib/actions'

jest.mock('@/app/lib/actions', () => ({
  authenticate: jest.fn(),
}))

describe('Given a LoginForm component', () => {
  describe('When is render', () => {
    it('Shoul renders the login form with all fields and button', () => {
      const { getByLabelText, getByRole } = render(<LoginForm />)

      expect(getByLabelText('Email')).toBeInTheDocument()
      expect(getByLabelText('Password')).toBeInTheDocument()
      expect(getByRole('button', { name: /log in/i })).toBeInTheDocument()
    })
  })

  describe('When the form is pending', () => {
    it('Should disables the login button', async () => {
      (authenticate as jest.Mock).mockImplementation(() => new Promise(() => [{}]))
      const { getByRole, getByLabelText } = render(<LoginForm />)

      const emailInput = getByLabelText('Email')
      const passwordInput = getByLabelText('Password')
      const loginButton = getByRole('button', { name: /log in/i })

      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'password')
      await userEvent.click(loginButton)

      await waitFor(() => {
        expect(loginButton).toHaveAttribute('aria-disabled', 'true')
      })
    })
  })

  describe('When the email and password is correct', () => {
    it('Should calls authenticate', async () => {
      const { getByRole, getByLabelText } = render(<LoginForm />)
      const emailInput = getByLabelText('Email')
      const passwordInput = getByLabelText('Password')
      const loginButton = getByRole('button', { name: /log in/i })

      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'password')
      await userEvent.click(loginButton)

      expect(authenticate).toHaveBeenCalled()
    })
  })
})
