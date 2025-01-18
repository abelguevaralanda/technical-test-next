'use client'

import { Button } from '@/app/ui/components/molecules/button/button'
import { useRouter } from 'next/navigation'
import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const isBackDisabled = currentPage === 1
  const isNextDisabled = currentPage === totalPages

  const handleNext = () => {
    if (currentPage < totalPages) {
      router.push(`?page=${currentPage + 1}`)
    }
  }

  const handleBack = () => {
    if (currentPage > 1) {
      router.push(`?page=${currentPage - 1}`)
    }
  }

  return (
    <div className="flex justify-center items-center gap-4 py-4">
      <Button onClick={handleBack} aria-disabled={isBackDisabled} className="btn h-8">
        Back
      </Button>
      <p className="font-bold">{`Page ${currentPage} of ${totalPages}`}</p>
      <Button onClick={handleNext} aria-disabled={isNextDisabled} className="btn h-8">
        Next
      </Button>
    </div>
  )
}
