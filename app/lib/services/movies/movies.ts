import type { Movie, Movies } from '@/app/lib/models/movies'

export const getMovies = async (page: number, query: string): Promise<Movies> => {
  try {
    const endpoint = query
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&api_key=${process.env.TMDB_API_KEY}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&page=${page}`

    const response = await fetch(
      endpoint,
      {
        cache: 'force-cache',
        next: { revalidate: 60 },
      },
    )

    const data: Movies = await response.json()

    const filteredMovies: Movie[] = data.results.filter((movie: Movie) => movie.title.toLowerCase().includes(query.toLowerCase()))

    return { ...data, results: filteredMovies }
  }
  catch (error) {
    throw new Error('Failed to fetch movies', error as Error)
  }
}

export const getImage = (path: string) => {
  return `https://image.tmdb.org/t/p/w500/${path}`
}
