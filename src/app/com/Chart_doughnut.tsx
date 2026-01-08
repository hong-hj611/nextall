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
          label: '취업률',
          data: doughnutData.values,
          cutout: '30%',
          backgroundColor: ['#ff3f3fff', '#2d8000ff', '#028d76ff', '#fca608ff']
        }]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  )
}

export default Chart_doughnut