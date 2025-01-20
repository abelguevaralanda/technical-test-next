import { getTrendingMoviesToDashboard } from '@/app/lib/services/dashboard/dashboard'
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks()

describe('Given a getTrendingMoviesToDashboard function', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('When fetch is successful', () => {
    it('Should returns movies data', async () => {
      const mockMovies = { results: [{ id: 1, title: 'Movie 1' }] }
      fetchMock.mockResponseOnce(JSON.stringify(mockMovies))

      const result = await getTrendingMoviesToDashboard()

      expect(result).toEqual(mockMovies)
    })
  })

  describe('When fetch fails', () => {
    it('Should throws an error', async () => {
      fetchMock.mockRejectOnce(new Error('Failed to fetch trending movies'))

      await expect(getTrendingMoviesToDashboard()).rejects.toThrow('Failed to fetch trending movies')
    })
  })
})
