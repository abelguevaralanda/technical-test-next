import type { Movies } from '@/app/lib/models/movies'

export const getMovies = async (page: number): Promise<Movies> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&page=${page}`,
      {
        cache: 'force-cache',
        next: { revalidate: 60 },
      },
    )

    return response.json()
  }
  catch (error) {
    throw new Error('Failed to fetch movies', error as Error)
  }
}

export const getImage = (path: string) => {
  return `https://image.tmdb.org/t/p/w500/${path}`
}
