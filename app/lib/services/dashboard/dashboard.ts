import type { Movies } from '@/app/lib/models/movies'

export const getTrendingMoviesToDashboard = async (): Promise<Movies> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`,
      {
        cache: 'force-cache',
        next: { revalidate: 60 },
      },
    )

    return response.json()
  }
  catch (error) {
    throw new Error('Failed to fetch trending movies', error as Error)
  }
}
