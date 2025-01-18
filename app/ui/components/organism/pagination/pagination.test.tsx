import React from 'react'
import { userEvent } from '@testing-library/user-event'
import { render } from '@testing-library/react'
import Pagination from '@/app/ui/components/organism/pagination/pagination'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Given a Pagination component', () => {
  const mockPush = jest.fn()
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When is the first page', () => {
    it('Should disables back button', () => {
      const { getByRole } = render(<Pagination currentPage={1} totalPages={5} />)

      expect(getByRole('button', { name: 'Back' })).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('When is the last page', () => {
    it('Should disables next button on last page', () => {
      const { getByRole } = render(<Pagination currentPage={5} totalPages={5} />)

      expect(getByRole('button', { name: 'Next' })).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('When is on a middle page', () => {
    it('Should enables both buttons', () => {
      const { getByRole } = render(<Pagination currentPage={3} totalPages={5} />)

      expect(getByRole('button', { name: 'Back' })).toHaveAttribute('aria-disabled', 'false')
      expect(getByRole('button', { name: 'Next' })).toHaveAttribute('aria-disabled', 'false')
    })
  })

  describe('When next button is clicked', () => {
    it('Should navigates to the next page ', async () => {
      const { getByRole } = render(<Pagination currentPage={2} totalPages={5} />)

      await userEvent.click(getByRole('button', { name: 'Next' }))

      expect(mockPush).toHaveBeenCalledWith('?page=3')
    })
  })

  describe('When back button is clicked', () => {
    it('Should navigates to the previous page', async () => {
      const { getByRole } = render(<Pagination currentPage={2} totalPages={5} />)

      await userEvent.click(getByRole('button', { name: 'Back' }))

      expect(mockPush).toHaveBeenCalledWith('?page=1')
    })
  })

  describe('When back button is clicked on first page', () => {
    it('Should does not navigate', async () => {
      const { getByRole } = render(<Pagination currentPage={1} totalPages={5} />)

      await userEvent.click(getByRole('button', { name: 'Back' }))

      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('When next button is clicked on last page', () => {
    it('Should does not navigate', async () => {
      const { getByRole } = render(<Pagination currentPage={5} totalPages={5} />)

      await userEvent.click(getByRole('button', { name: 'Next' }))

      expect(mockPush).not.toHaveBeenCalled()
    })
  })
})
