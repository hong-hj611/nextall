'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import styles from './ImageRolling.module.scss'
import ImageModal from './ImageModal'

const images = [
  '/imgs/erom.png',
  '/imgs/subway.png',
  '/imgs/woodin.png',
  '/imgs/react_vyor.png',
  '/imgs/portfolio.png',
  '/imgs/santiago.png',
  '/imgs/vyor.png',
  '/imgs/particle.png',
  '/imgs/guess.png',
  '/imgs/breakout.png',
  '/imgs/calculator.png',
  '/imgs/guestbook.png',
  '/imgs/chart.png',
  '/imgs/googlesearch.png',
  '/imgs/movingball.png',
  '/imgs/kkomap.png',
  '/imgs/weather.png',
  '/imgs/skills.png',
  '/imgs/signup.png',
]

const ImageRolling = () => {
  const [selected, setSelected ] = useState<string | null>(null)
  return (
    <>
    <section className={styles.rollingWrap}>
      <div className={styles.track}>
        {
          [...images, ...images].map((item, idx) => (
            <div key={idx} className={styles.imgBox} onClick={() => setSelected(item)}>
              <Image 
                src={item}
                alt="project image"
                width={300}
                height={180}
                // priority={false} 이미지 클릭 안됨
              />
            </div>
          ))
        }
      </div>
    </section>

    {selected && (
      <ImageModal 
        src={selected}
        onClose={() => setSelected(null)}
      />
    )}
    </>
  )
}

export default ImageRolling