import type { Movie } from '@/app/lib/models/movies'
import type { EChartsOption } from 'echarts'

export const trendingMoviesChart = (trendingMovies: Movie[]): EChartsOption => {
  const voteCounts = Array.from({ length: 10 }, (_, i) => trendingMovies.filter(movie => movie.vote_average >= i + 1 && movie.vote_average < i + 2).length,
  )

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '80',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        name: 'Averages',
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: voteCounts,
      },
    ],
  }
}
