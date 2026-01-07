'use client'
import React, { useRef, useEffect } from 'react'
// 이미지 슬라이드 적용 위해
import { Swiper,  SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
// 글자 애니메이션 적용 위해
import gsap from 'gsap'
import ScrollTrigger from 'gsap/src/ScrollTrigger'
import styles from './SlidePage.module.scss'

// swiper의 css를 반드시 불러와야 적용됨
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

gsap.registerPlugin(ScrollTrigger)

type Slide = {
  id: number
  title: string
  subtitle: string
  type: 'image' | 'video'
  src: string
}

const SlidePage = () => {

  const rootRef = useRef<HTMLDivElement | null>(null)

  const slides: Slide[] = [
    {id: 1, title: 'Next', subtitle: 'login-logout-signup 기능 구현 / GCP, DB 연동', type: 'video', src: '/imgs/world01.mp4'},
    {id: 2, title: 'GSAP', subtitle: '애니메이션 라이브러리 활용 / 글자 애니메이션 구현 / 스크롤 이벤트 구현', type: 'video', src: '/imgs/world02.mp4'},
    {id: 3, title: 'Swiper', subtitle: 'Slide 구현 / ScrollTrigger', type: 'video', src: '/imgs/world03.mp4'},
  ]

  const cards = [
    { id: 1, title: '구조', text: 'Next.js 구조와 페이지 흐름을 정리합니다.' },
    { id: 2, title: '애니메이션', text: 'GSAP로 기본 인터랙션을 추가합니다.' },
    { id: 3, title: 'UI 패턴', text: 'Swiper, 카드 레이아웃 등 실무 패턴을 사용합니다.' },
  ]

  useEffect(() => {
    const ctx = gsap.context( () => {
      // swiper가 자동으로 붙이는 클래스 사용(<SwiperSlide> 영역안에 있는것을 컨트롤 해야하므로)
      // swiper-slide-active : 지금 현재 활성화(보이는) 된 슬라이드 표시
      // swiper-slide-next : 다음에 표시될 슬라이드
      // swiper-slide-prev : 이전 슬라이드

      const sec = document.querySelector<HTMLElement>('.swiper-slide-active')

      // overlay되는 글자를 담고있는 div를 가져오기 위해 data 속성을 지정하고 가져온다
      const tex = sec?.querySelectorAll<HTMLElement>('[data-text]')

      if (tex?.length) {
        // gsap 애니메이션 모두 지우고 새로 시작. tex만 실행
        gsap.killTweensOf(tex)
        // 초기값 셋팅
        gsap.set(tex, {y: 20, opacity: 0})
        // to로 진행
        gsap.to( tex, {y: 0, opacity: 1, duration: 1, stagger:0.2, ease:'power2.out', })
      }

    }, rootRef)
    return () => {ctx.revert()}
  }, [])

  // onSlideChange 될때 해당 이벤트값을 받아 실행
  const onSlide = (swiper: any) => {
    // activeIndex : swiper가 제공하는 명령어로 활성화된 index를 가져와 배열로 받는다 (안전성)
    const slide = swiper.slides[swiper.activeIndex] as HTMLElement 
    // const slide = document.querySelector<HTMLElement>('.swiper-slide-active')  //사용은 가능하나 안전성 문제가 있다
    const txt = slide.querySelectorAll<HTMLElement>('[data-text]')

    if (!txt.length) return
      gsap.killTweensOf(txt)
      // 초기값 셋팅
      gsap.set(txt, {y: 20, opacity: 0})
      // to로 진행 (슬라이드 나오는 시간 + 멈춰있는 시간을 빼고 나타나도록 delay시간을 조절한다)
      gsap.to( txt, {y: 0, opacity: 1, duration: 1, delay: 1, stagger:0.2, ease:'power2.out', })
    
  }

  return (
    <main className={styles.page} ref={rootRef}>
      <section className={styles.hero}>
        <Swiper 
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          speed={600}  // 이미지 바뀌는 시간
          navigation={true}
          pagination={{clickable: true}}  // navigation 클릭 작동 되도록
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,  // autoplay 도중 navigation 클릭후 다시 autoplay되도록 설정   
          }}
          className={styles.swiper}
          onSlideChange={onSlide}  // 슬라이드 변경될때 실행 (글자애니메이션 적용을 위해)
        >
          {
            slides.map((item) => (
              <SwiperSlide key={item.id} className={styles.slide}>
                {item.type === 'image' 
                ? (<img src={item.src} alt={item.title} />) 
                : (<video src={item.src} autoPlay muted loop playsInline className={styles.video} />)
                }
                
                <div className={styles.overlay} data-text>
                  <h2>{item.title}</h2>
                  <p>{item.subtitle}</p>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>

        <div className={styles.scrollHint} data-scroll-hint>
          <span className={styles.scrollText}>Scroll</span>
        </div>
      </section>

      {/* 섹션 2 */}
      {/* <section className={styles.about} data-about>
        <div className={styles.aboutInner}>
          <h3 className={styles.aboutTitle}>LogNext About</h3>
          <p className={styles.aboutSub}>
            스크롤 시 자연스럽게 등장하는 두 번째 섹션입니다.
          </p>

          <div className={styles.aboutGrid}>
            {cards.map((c) => (
              <article key={c.id} className={styles.aboutCard} data-about-card>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section> */}
    </main>
    
  )
}

export default SlidePage