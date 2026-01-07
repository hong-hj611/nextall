'use client'
import React from 'react'
import SlidePage from './com/SlidePage'
import styles from './page.module.css'
import ChartPage from './com/ChartPage'

const page = () => {
  return (
    <section className={`${styles.panel} ${styles.panel1}`} data-panel>
      <SlidePage />
    </section>
  )
}

export default page