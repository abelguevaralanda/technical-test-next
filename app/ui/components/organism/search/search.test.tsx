import { userEvent } from '@testing-library/user-event'
import React from 'react'
import { render } from '@testing-library/react'
import Search from '@/app/ui/components/organism/search/search'
import useSearch from '@/app/lib/hooks/use-search'

jest.mock('@/app/lib/hooks/use-search')

describe('Given a Search component', () => {
  const handleSearchParamsMock = jest.fn()
  useSearch.mockReturnValue({
    searchParams: new URLSearchParams(),
    handleSearchParams: handleSearchParamsMock,
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When it is rendered', () => {
    it('Should renders input field with placeholder text', () => {
      const { getByPlaceholderText } = render(<Search />)

      const inputElement = getByPlaceholderText('Search for movies...')

      expect(inputElement).toBeInTheDocument()
    })
  })

  describe('When on input change', () => {
    it('Should calls handleSearchParams', async () => {
      const { getByPlaceholderText } = render(<Search />)

      const inputElement = getByPlaceholderText('Search for movies...')

      await userEvent.type(inputElement, 'Inception')

      expect(handleSearchParamsMock).toHaveBeenCalledWith('Inception')
    })
  })

  describe('When receives a query', () => {
    it('Should sets default value from searchParams', () => {
      const searchParams = new URLSearchParams()

      searchParams.set('query', 'Matrix')

      useSearch.mockReturnValue({
        searchParams,
        handleSearchParams: jest.fn(),
      })

      const { getByPlaceholderText } = render(<Search />)

      const inputElement = getByPlaceholderText('Search for movies...')

      expect(inputElement).toHaveValue('Matrix')
    })
  })
})
