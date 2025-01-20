import type { ReactElement } from 'react'
import React from 'react'
import { abel } from '@/app/ui/fonts'

export interface Column<T> {
  header: string
  accessor: keyof T
  customRow?: (value: T) => ReactElement
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  title: string
}

export default function Table<T extends { id: string | number }>({ columns, data, title }: Readonly<TableProps<T>>) {
  return (
    <section className="w-full">
      <h1 className={`${abel.className} mb-8 text-xl md:text-2xl`}>
        {title}
      </h1>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    {columns.map(column => (
                      <th key={String(column.accessor)} className="px-4 py-5 font-medium">
                        {column.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {data.map(row => (
                    <tr key={row.id} className="group">
                      {columns.map(column => (
                        <td key={String(column.accessor)} className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          {column.customRow ? column.customRow(row) : row[column.accessor] as ReactElement}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
