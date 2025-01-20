import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MoviesError from './error'

describe('Given a MoviesError Component', () => {
  const mockReset = jest.fn()
  const mockError = new Error('Failed to Delete Invoice')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('When the Movies page have an error', () => {
    it('Should renders error message', () => {
      render(<MoviesError error={mockError} reset={mockReset} />)

      expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
      expect(screen.getByText('Failed to Delete Invoice')).toBeInTheDocument()
    })

    it('Should calls reset function on button click', () => {
      render(<MoviesError error={mockError} reset={mockReset} />)

      fireEvent.click(screen.getByText('Try again'))

      expect(mockReset).toHaveBeenCalledTimes(1)
    })

    it('Should does not call reset function if button is not clicked', () => {
      render(<MoviesError error={mockError} reset={mockReset} />)

      expect(mockReset).toHaveBeenCalledTimes(0)
    })
  })
})
