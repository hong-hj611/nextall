'use client'
import React from 'react'
import '@/app/lib/chartjs'
import { Pie } from 'react-chartjs-2'
import { pieData } from '../lib/chartData'

const Chart_pie = () => {
  // const labels = ['20대', '30대', '40대', '50대']
  // const values = [40, 20, 12, 28]

  return (
    <Pie 
      data={{
        labels: pieData.labels,
        datasets: [{
          label: '연령별 구매율',
          data: pieData.values,
          backgroundColor: ['#ffaaaaff', '#46c502ff', '#00ccaaff', '#ffcc26ff']

        }]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  )
}

export default Chart_pie