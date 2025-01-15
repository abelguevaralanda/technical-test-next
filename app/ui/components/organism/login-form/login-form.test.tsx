import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LoginForm from './login-form'
import { authenticate } from '@/app/lib/actions'

jest.mock('@/app/lib/actions', () => ({
  authenticate: jest.fn(),
}))

describe('LoginForm', () => {
  it('renders the login form with all fields and button', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('disables the login button when the form is pending', async () => {
    (authenticate as jest.Mock).mockImplementation(() => new Promise(() => {}))
    render(<LoginForm />)
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const loginButton = screen.getByRole('button', { name: /log in/i })

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password')
    await userEvent.click(loginButton)

    await waitFor(() => {
      expect(loginButton).toHaveAttribute('aria-disabled', 'true')
    })
  })

  it('does not display an error message when there is no error', () => {
    render(<LoginForm />)
    expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument()
  })

  it('calls authenticate with correct email and password', async () => {
    render(<LoginForm />)
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const loginButton = screen.getByRole('button', { name: /log in/i })

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'password')
    await userEvent.click(loginButton)

    expect(authenticate).toHaveBeenCalled()
  })
})
