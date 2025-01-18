import React from 'react'
import { render, screen } from '@testing-library/react'
import type { Column } from './table'
import Table from './table'

interface Data { id: number, name: string }

const columns: Column<Data>[] = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
]

const data: Data[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
]
describe('Given a Table component', () => {
  describe('When the component receives the headers', () => {
    it('Should renders correctly', () => {
      render(<Table columns={columns} data={data} title="Test Table" />)
      expect(screen.getByText('ID')).toBeInTheDocument()
      expect(screen.getByText('Name')).toBeInTheDocument()
    })
  })

  describe('When receives the rows', () => {
    it('Should renders correctly', () => {
      render(<Table columns={columns} data={data} title="Test Table" />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })
  })

  describe('When receives a custom row', () => {
    it('renders correctly', () => {
      const customColumns: Column<Data>[] = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name', customRow: (row: Data) => <span>{row.name.toUpperCase()}</span> },
      ]
      render(<Table columns={customColumns} data={data} title="Test Table" />)
      expect(screen.getByText('JOHN DOE')).toBeInTheDocument()
      expect(screen.getByText('JANE DOE')).toBeInTheDocument()
    })
  })

  describe('When receives empty data', () => {
    it('Should render empty', () => {
      render(<Table columns={columns} data={[]} title="Test Table" />)
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
      expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument()
    })
  })
})
