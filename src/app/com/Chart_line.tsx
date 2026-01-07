'use client'
import React from 'react'
import '@/app/lib/chartjs' // @- root, import되어 있어야 chart사용 가능
import { Line } from 'react-chartjs-2' // import되어 있어야 chart사용 가능
import { lineData } from '../lib/chartData' // hook으로 import시킴(chartData.ts)

const Chart_line = () => {
  // const labels = ['월', '화', '수', '목', '금'];
  // const values = [150, 190, 90, 170, 120];


  return (
    <Line 
      data = {{
        labels: lineData.labels,  // 이름이 같을땐 값을 안써도 된다
        datasets: [{
          label: '요청 수',
          data: lineData.values,
          tension: 0.3,
          backgroundColor: 'darkgreen'
        }]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,  // chart 비율 조절가능
        
      }}
      />
  )
}

export default Chart_line