import { getImage, getMovies } from '@/app/lib/services/movies/movies'
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks()

describe('Given a getMovies', () => {
  describe('When is called with a query', () => {
    it('Should fetches and filters movies successfully', async () => {
      const mockMovies = { results: [{ id: 2, title: 'Another Movie' }] }

      fetchMock.mockResponseOnce(JSON.stringify({ results: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Another Movie' }] }))

      const movies = await getMovies(1, 'Another')

      expect(movies).toEqual(mockMovies)
    })

    it('Should return an empty array if no movies match the query', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ results: [{ id: 1, title: 'Another Movie' }] }))

      const movies = await getMovies(1, 'Nonexistent')

      expect(movies.results).toEqual([])
    })
  })

  describe('When is called without a query', () => {
    it('Should fetches movies successfully', async () => {
      const mockMovies = { results: [{ id: 1, title: 'Movie 1' }] }

      fetchMock.mockResponseOnce(JSON.stringify(mockMovies))

      const movies = await getMovies(1, '')

      expect(movies).toEqual(mockMovies)
    })
  })

  describe('When fetch fails', () => {
    it('Should throws an error ', async () => {
      fetchMock.mockRejectOnce(new Error('Failed to fetch movies'))

      await expect(getMovies(1, '')).rejects.toThrow('Failed to fetch movies')
    })
  })
})

describe('Given a getImage', () => {
  describe('When is called', () => {
    it('returns the correct image URL', () => {
      const path = 'some-image-path.jpg'
      const url = getImage(path)

      expect(url).toBe('https://image.tmdb.org/t/p/w500/some-image-path.jpg')
    })
  })
})
