import type { Movie } from '@/app/lib/models/movies'
import { getImage, getMovies } from '@/app/lib/services/movies/movies'
import TagStatus from '@/app/ui/components/atoms/tag'
import Pagination from '@/app/ui/components/organism/pagination/pagination'
import type { Column } from '@/app/ui/components/organism/table/table'
import Table from '@/app/ui/components/organism/table/table'
import Image from 'next/image'
import React from 'react'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'

const TITLE_TEXT = 'Movies'
const TOTAL_PAGES = 1000

const COLUMNS: Column<Movie>[] = [
  {
    header: 'Picture',
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
  { header: 'Title', accessor: 'title', customRow: (row: Movie) => <p className="font-bold">{row.title}</p> },
  { header: 'Release date', accessor: 'release_date' },
  {
    header: 'Average vote',
    accessor: 'vote_average',
    customRow: (row: Movie) => (
      <TagStatus status={row.vote_average >= 5} statusTag={<FaThumbsUp />} statusSubtag={<FaThumbsDown />} />
    ),
  },
]

export default async function MoviesPage({ searchParams }: Readonly<{
  searchParams: Promise<{
    page?: string
  }>
}>) {
  const page = parseInt((await searchParams).page || '1', 10)
  const movies = await getMovies(page)
  const rowsData = movies.results

  return (
    <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      <Table data={rowsData} columns={COLUMNS} title={TITLE_TEXT} />
      <Pagination currentPage={page} totalPages={TOTAL_PAGES} />
    </div>
  )
}
