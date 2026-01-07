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
          label: '연령별 지원자 비율0',
          data: pieData.values,
          backgroundColor: ['#faa', 'rgba(83, 228, 0, 1)', 'rgba(3, 206, 172, 1)', '#ffcc26ff']
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