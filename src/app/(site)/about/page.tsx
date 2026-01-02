"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger} from "gsap/ScrollTrigger";
import styles from "./page.module.scss";
import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";

gsap.registerPlugin(ScrollTrigger);

const page = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const heraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const panels = sectionRef.current?.querySelectorAll("[data-panel]");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${3 * window.innerHeight}`,
          scrub: 1.5, //1.5초동안 같이 스르륵 멈추도록 작동
          pin: true, //섹션은 그대로 화면에 고정하고 그 안에서 패널/배경/텍스트만 변화
        },
      });

      gsap.set(heraRef.current, {
        opacity: 1,
        y: 0,
      });

      panels?.forEach((item, idx) => {
        if (idx === 0) return;
        tl.fromTo(item, { yPercent: 100 }, { yPercent: 0, duration: 1 });
        // fromTo는 시작값과 종료값을 명확히 지정하는 GSAP 메서드, 100또는 1로만 제공
        // yPercent는 요소 자신의 높이를 기준으로 한 이동 비율이며
        // 100은 화면 아래 완전히 숨긴 상태, 0은 정상 위치를 의미한다

        if (idx === 1 && heraRef.current) {
          tl.to(heraRef.current, {
            opacity: 0,
            y: -80,
            scale: 0.95,
            duration: 0.8,
            ease: 'power2.out'
          },
          "<"
          )
        }
      });
    }, sectionRef);

    return () => {ctx.revert()};
  }, []);
  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`${styles.panel} ${styles.panel1}`} data-panel>
        <img src="imgs/hera.jpg" alt="hera image" />
        <div className={styles.hera} ref={heraRef}>H E R A</div>
      </div>
      <div className={`${styles.panel} ${styles.panel2}`} data-panel>
        <div className={styles.panel2_inner}>
          <h2>Contemporary Seoul Beauty<br />
              Here, Now, Myself</h2>
          <div className={styles.line}></div>
          <div className={styles.text}>
            <p>지금, 여기에서, 가장 나답게.</p>
            <p>헤라는 서울의 역동적인 아름다움에 주목하고 이를 더욱 다채로운 나다움으로 재해석하여 세계에 전파하는 컨템포러리 서울 뷰티 브랜드입니다.</p>
            <p>헤라가 추구하는 아름다움에 대한 신념은 나 자신의 본질에 있습니다. 모두가 고유한 자신만의 아름다움을 발현할 수 있도록, 늘 한 발 앞선 새로운 해석과 시도를 통해 서울리스타의 아름다움을 시대 정신에 맞게 발전시키고 있습니다.</p>
            <p>서울리스타의 아름다움, 그 중심엔 자기주도적이고 능동적인 삶의 태도가 있습니다. 빠르게 변화하는 도시 속에서 자신의 모든 가능성을 열어두고 한계를 제한하지 않으며, 깨어있는 감각과 유연한 사고 방식으로 자신만의 아름다움을 탄생시켜 나갑니다.</p>
            <p>본연의 아름다움을 발산하는 베이스부터 다양성을 포용하는 편안한 컬러 메이크업까지, 헤라의 뷰티 루틴은 고유의 아름다움을 있는 그대로 드러내며 발산되는 존재감으로 나만의 다채로운 아름다움을 발굴하게 합니다.</p>
          </div>
        </div>
      </div>
      <div className={`${styles.panel} ${styles.panel3}`} data-panel>
        <h2>세번째 섹션</h2>
        <p>어떻게 구성해야 할까??????</p>
      </div>
    </section>
  );
};

export default page;