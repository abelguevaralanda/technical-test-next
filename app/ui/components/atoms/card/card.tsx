import { abel } from '@/app/ui/fonts'
import React from 'react'
import type { ReactElement } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactElement
}

export function Card({
  title,
  subtitle,
  children,
}: Readonly<CardProps>) {
  return (
    <div className="rounded-xl bg-gray-50  shadow-sm p-4">
      <p
        className={`${abel.className}
          truncate rounded-xl  px-4 text-center text-2xl font-semibold`}
      >
        {title}
      </p>
      <p className="text-center text-s text-gray-700">
        {subtitle}
      </p>
      {children}
    </div>
  )
}
