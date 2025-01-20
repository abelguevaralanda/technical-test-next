import { getImage, getMovies } from '@/app/lib/services/movies/movies'
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks()

describe('Given a getMovies', () => {
  describe('When is called', () => {
    it('Should fetches movies successfully', async () => {
      const mockMovies = { results: [{ id: 1, title: 'Movie 1' }] }

      fetchMock.mockResponseOnce(JSON.stringify({ results: [{ id: 1, title: 'Movie 1' }] }))

      const movies = await getMovies(1)

      expect(movies).toEqual(mockMovies)
    })

    it('Should throws an error when fetch fails', async () => {
      fetchMock.mockRejectOnce(new Error('Failed to fetch movies'))

      await expect(getMovies(1)).rejects.toThrow('Failed to fetch movies')
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
