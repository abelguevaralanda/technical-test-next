import { signOut } from '@/auth'
import { userEvent } from '@testing-library/user-event'
import React from 'react'
import { render } from '@testing-library/react'
import SideNav from './sidenav'

jest.mock('@/auth', () => ({
  signOut: jest.fn(),
}))

describe('Given a SideNav component', () => {
  describe('When it is rendering', () => {
    it('Should renders a home link', () => {
      const { getByRole } = render(<SideNav />)

      expect(getByRole('link', { name: /home/i })).toBeInTheDocument()
    })

    it('Should renders the sign out button with correct text', () => {
      const { getByText } = render(<SideNav />)
      expect(getByText('Sign Out')).toBeInTheDocument()
    })
  })

  describe('When sign out button is clicked', () => {
    it('Should calls signOut function ', async () => {
      const { getByRole } = render(<SideNav />)
      const signOutButton = getByRole('button', { name: /sign out/i })
      await userEvent.click(signOutButton)
      expect(signOut).toHaveBeenCalled()
    })
  })
})
