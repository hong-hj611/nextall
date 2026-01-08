'use client'
import React from 'react'
import '@/app/lib/chartjs'
import { Doughnut } from 'react-chartjs-2'
import { doughnutData } from '../lib/chartData'

const Chart_doughnut = () => {
  // const labels = ['20대', '30대', '40대', '50대']
  // const values = [24, 42, 18, 16]
  return (
    <Doughnut 
      data={{
        labels: doughnutData.labels,
        datasets: [{
          label: '브랜드 구매율',
          data: doughnutData.values,
          backgroundColor: ['#ff3f3fff', '#2d8000ff', '#028d76ff', '#fca608ff']
        }]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        cutout: '30%',
      }}
    />
  )
}

export default Chart_doughnut