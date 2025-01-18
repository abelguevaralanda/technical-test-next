import { getImage, getMovies } from '@/app/lib/services/movies/movies'

describe('Given a getMovies', () => {
  describe('When is called', () => {
    it('Should fetches movies successfully', async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({ results: [{ id: 1, title: 'Movie 1' }] }),
      }),
      ) as jest.Mock

      const movies = await getMovies(1)

      expect(movies).toEqual({ results: [{ id: 1, title: 'Movie 1' }] })
    })

    it('Should throws an error when fetch fails', async () => {
      global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error'))) as jest.Mock

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
