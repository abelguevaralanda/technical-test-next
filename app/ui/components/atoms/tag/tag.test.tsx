import React from 'react'
import { render, screen } from '@testing-library/react'
import TagStatus from '@/app/ui/components/atoms/tag/tag'

describe('TagStatus component', () => {
  it('renders with status true and displays text statusTag', () => {
    render(<TagStatus status={true} statusTag="Active" statusSubtag="Inactive" />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders with status false and displays text statusSubtag', () => {
    render(<TagStatus status={false} statusTag="Active" statusSubtag="Inactive" />)
    expect(screen.getByText('Inactive')).toBeInTheDocument()
  })
})
