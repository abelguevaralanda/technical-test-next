import { MOVIES_TABLE_HEADERS_TEXTS } from '@/app/lib/const/movies/table'
import type { Movie } from '@/app/lib/models/movies'
import { getImage, getMovies } from '@/app/lib/services/movies/movies'
import TagStatus from '@/app/ui/components/atoms/tag/tag'
import Pagination from '@/app/ui/components/organism/pagination/pagination'
import { TableSkeleton } from '@/app/ui/components/organism/table/components/skeleton'
import type { Column } from '@/app/ui/components/organism/table/table'
import Table from '@/app/ui/components/organism/table/table'
import Image from 'next/image'
import React, { Suspense } from 'react'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'

const TOTAL_PAGES = 1000

const COLUMNS: Column<Movie>[] = [
  {
    header: MOVIES_TABLE_HEADERS_TEXTS.PICTURE_TABLE_TEXT,
    accessor: 'poster_path',
    customRow: (row: Movie) => (
      <Image
        src={getImage(row.backdrop_path)}
        alt={row.title}
        className="rounded-lg shadow-lg"
        width={80}
        height={45}
      />
    ),
  },
  { header: MOVIES_TABLE_HEADERS_TEXTS.TITLE_TABLE_TEXT, accessor: 'title', customRow: (row: Movie) => <p className="font-bold">{row.title}</p> },
  { header: MOVIES_TABLE_HEADERS_TEXTS.RELEASE_DATE_TABLE_TEXT, accessor: 'release_date' },
  {
    header: MOVIES_TABLE_HEADERS_TEXTS.AVERAGE_VOTE_TABLE_TEXT,
    accessor: 'vote_average',
    customRow: (row: Movie) => (
      <TagStatus status={row.vote_average >= 5} statusTag={<FaThumbsUp />} statusSubtag={<FaThumbsDown />} />
    ),
  },
]

export default async function MoviesPage(props: Readonly<{
  searchParams: Promise<{
    query?: string
    page?: string
  }>
}>) {
  const searchParams = await props.searchParams
  const query = searchParams.query ?? ''
  const page = parseInt((searchParams).page ?? '1', 10)
  const movies = await getMovies(page, query)
  const rowsData = movies.results
  console.log(rowsData)

  return (
    <main className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      <Suspense key={query + page} fallback={<TableSkeleton />}>
        <Table data={rowsData} columns={COLUMNS} title={MOVIES_TABLE_HEADERS_TEXTS.TITLE_TEXT} />
      </Suspense>
      <Pagination currentPage={page} totalPages={TOTAL_PAGES} />
    </main>
  )
}
