'use client'

import useSearch from '@/app/lib/hooks/use-search'
import InputField from '@/app/ui/components/molecules/input-field/input-field'
import React from 'react'
import { IoMdSearch } from 'react-icons/io'

const SEARCH_PLACEHOLDER_TEXT = 'Search for movies...'

export default function Search() {
  const { searchParams, handleSearchParams } = useSearch()

  return (
    <div>
      <InputField
        inputType="text"
        placeholder={SEARCH_PLACEHOLDER_TEXT}
        icon={(
          <IoMdSearch
            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
          />
        )}
        onChange={e => handleSearchParams(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  )
}
