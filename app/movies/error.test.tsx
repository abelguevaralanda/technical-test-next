import { userEvent } from '@testing-library/user-event'
import React from 'react'
import { render } from '@testing-library/react'
import MoviesError from './error'

describe('Given a MoviesError Component', () => {
  const mockReset = jest.fn()
  const mockError = new Error('Failed to Delete Invoice')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('When the Movies page have an error', () => {
    it('Should renders error message', () => {
      const { getByText } = render(<MoviesError error={mockError} reset={mockReset} />)

      expect(getByText('Something went wrong!')).toBeInTheDocument()
      expect(getByText('Failed to Delete Invoice')).toBeInTheDocument()
    })

    it('Should calls reset function on button click', async () => {
      const { getByText } = render(<MoviesError error={mockError} reset={mockReset} />)

      await userEvent.click(getByText('Try again'))

      expect(mockReset).toHaveBeenCalledTimes(1)
    })

    it('Should does not call reset function if button is not clicked', () => {
      render(<MoviesError error={mockError} reset={mockReset} />)

      expect(mockReset).toHaveBeenCalledTimes(0)
    })
  })
})
