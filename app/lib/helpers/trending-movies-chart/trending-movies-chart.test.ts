import { trendingMoviesChart } from '@/app/lib/helpers/trending-movies-chart/trending-movies-chart'
import type { Movie } from '@/app/lib/models/movies'

describe('Given a trendingMoviesChart function', () => {
  describe('When receives data', () => {
    it('Should returns correct chart options for given movies', () => {
      const mockMovies: Movie[] = Array.from({ length: 10 }, (_, i) => ({
        vote_average: i + 1.5,
        adult: false,
        backdrop_path: '',
        genre_ids: [],
        id: 0,
        original_language: '',
        original_title: '',
        overview: '',
        popularity: 0,
        poster_path: '',
        release_date: '',
        title: '',
        video: false,
        vote_count: 0,
      }))

      const result = trendingMoviesChart(mockMovies)

      // @ts-ignore
      expect(result.series[0].data ?? []).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })
  })
})
