import Home from '@/app/page'
import { render } from '@testing-library/react'
import React from 'react'

describe('Given a page component', () => {
  describe('When its rendered', () => {
    it('should render a text', () => {
      const { getByText } = render(<Home />)

      expect(getByText(/Hola/)).toBeInTheDocument()
    })
  })
})
