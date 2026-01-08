'use client'
import React from 'react'
import '@/app/lib/chartjs'
import { Bar } from 'react-chartjs-2'
import { barData } from '../lib/chartData'

const Chart_bar = () => {
  // const labels = ['월', '화', '수', '목', '금'];
  // const values = [150, 190, 90, 170, 120];

  return (
    <Bar  // type
      data = {{
        labels: barData.labels, // x축값
        datasets: [{    // y축값
          label: '구매율',
          data: barData.values,
          backgroundColor: '#0f1183ff'
        }]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  )
}

export default Chart_bar