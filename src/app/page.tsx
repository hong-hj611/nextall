'use client'
import React from 'react'
import SlidePage from './com/SlidePage'
import styles from './page.module.css'

const page = () => {
  return (
    <section>
      <div className={`${styles.panel} ${styles.panel1}`} data-panel>
        <SlidePage />
      </div>
      
      {/* <div className={`${styles.panel} ${styles.panel2}`} data-panel>
        <h1>두번째 섹션</h1>
      </div> */}
    </section>
  )
}

export default page