import { Card } from '@/app/ui/components/atoms/card/card'
import { ChartsSkeleton } from '@/app/ui/components/organism/charts/components/charts-skeleton'
import React, { Suspense } from 'react'
import { trendingMoviesChart } from '@/app/lib/helpers/trending-movies-chart/trending-movies-chart'
import { getTrendingMoviesToDashboard } from '@/app/lib/services/dashboard/dashboard'
import Charts from '@/app/ui/components/organism/charts/charts'

const DASHBOARD_CARD_TITLE_TEXT = 'Average votes for trending movies'
const DASHBOARD_CARD_SUBTITLE_TEXT = 'This graph shows the average number of trending movies of the day'

export default async function DashboardPage() {
  const trendingMovies = await getTrendingMoviesToDashboard()
  const options = trendingMoviesChart(trendingMovies.results)

  return (
    <main>
      <section className="w-1/2">
        <Card title={DASHBOARD_CARD_TITLE_TEXT} subtitle={DASHBOARD_CARD_SUBTITLE_TEXT}>
          <Suspense fallback={<ChartsSkeleton />}>
            <Charts option={options} />
          </Suspense>
        </Card>
      </section>
    </main>
  )
}
