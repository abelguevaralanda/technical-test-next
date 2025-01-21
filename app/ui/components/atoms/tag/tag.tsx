import type { ReactElement } from 'react'
import React from 'react'
import clsx from 'clsx'

interface TagStatusProps {
  status: boolean
  statusTag?: string | ReactElement
  statusSubtag?: string | ReactElement
}

export default function TagStatus({ status, statusTag, statusSubtag }: Readonly<TagStatusProps>) {
  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1  font-medium',
        {
          'bg-green-500 text-white': status,
          'bg-blue-500 text-gray-500': !status,
        },
      )}
    >
      <div className="text-amber-50 font-bold w-5.5 h-4 px-1">
        {status ? statusTag : statusSubtag}
      </div>
    </div>
  )
}
