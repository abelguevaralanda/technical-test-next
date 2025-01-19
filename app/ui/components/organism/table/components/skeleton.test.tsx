import React from 'react'
import { render, screen } from '@testing-library/react'
import { TableSkeleton } from './skeleton'
import { MOVIES_TABLE_HEADERS_TEXTS } from '@/app/lib/const/movies/table'

describe('Give a TableSkeleton Component', () => {
  describe('When is called', () => {
    it('Should renders table headers correctly', () => {
      render(<TableSkeleton />)
      expect(screen.getByText(MOVIES_TABLE_HEADERS_TEXTS.PICTURE_TABLE_TEXT)).toBeInTheDocument()
      expect(screen.getByText(MOVIES_TABLE_HEADERS_TEXTS.TITLE_TABLE_TEXT)).toBeInTheDocument()
      expect(screen.getByText(MOVIES_TABLE_HEADERS_TEXTS.RELEASE_DATE_TABLE_TEXT)).toBeInTheDocument()
      expect(screen.getByText(MOVIES_TABLE_HEADERS_TEXTS.AVERAGE_VOTE_TABLE_TEXT)).toBeInTheDocument()
    })
  })

  it('Should renders correct number of TableRowSkeleton components', () => {
    render(<TableSkeleton />)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(7)
  })
})
