import React from 'react'
import Chart_line from './Chart_line'
import Chart_bar from './Chart_bar'
import Chart_pie from './Chart_pie'
import Chart_doughnut from './Chart_doughnut'
import styles from './ChartPage.module.scss'

const ChartPage = () => {
  return (
    <section className={styles.container}>
      <h1>Next에서 chart.js 활용하기</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>라인그래프</h2>
          <div className={styles.chartBox}><Chart_line /></div>
        </div>
        <div className={styles.card}>
          <h2>막대그래프</h2>
          <div className={styles.chartBox}><Chart_bar /></div>
        </div>
        <div className={styles.card}>
          <h2>원그래프</h2>
          <div className={styles.chartBox}><Chart_pie /></div>
        </div>
        <div className={styles.card}>
          <h2>도넛그래프</h2>
          <div className={styles.chartBox}><Chart_doughnut /></div>
        </div>
      </div>
    </section>
  )
}

export default ChartPage