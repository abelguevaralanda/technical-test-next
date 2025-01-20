'use client'

import type { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import React from 'react'

export default function Charts({ option }: Readonly<{ option: EChartsOption }>) {
  return (
    <ReactECharts option={option} className="h-96 w-full" />
  )
}
