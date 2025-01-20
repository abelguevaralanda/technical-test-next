import React from 'react'
import { render } from '@testing-library/react'
import { Card } from '@/app/ui/components/atoms/card/card'

const renderChildren = () => <div>Children</div>

describe('Given a Card component', () => {
  describe('When receives the title', () => {
    it('Should render it correctly', () => {
      const { getByText } = render(
        <Card title="Test Title">
          {renderChildren()}
        </Card>,
      )

      expect(getByText('Test Title')).toBeInTheDocument()
    })
  })

  describe('When receives the subtitle', () => {
    it('Should render it correctly', () => {
      const { getByText } = render(
        <Card title="Test Title" subtitle="Test Subtitle">
          {renderChildren()}
        </Card>,
      )

      expect(getByText('Test Subtitle')).toBeInTheDocument()
    })
  })

  describe('When receives the children', () => {
    it('Should render it correctly', () => {
      const { getByText } = render(
        <Card title="Test Title" subtitle="Test Subtitle">
          {renderChildren()}
        </Card>,
      )

      expect(getByText('Children')).toBeInTheDocument()
    })
  })
})
