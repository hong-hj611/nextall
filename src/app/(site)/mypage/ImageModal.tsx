'use client'
import Image from "next/image"
import styles from "./ImageModal.module.scss"

type Props = {
  src: string
  onClose: () => void
}

const ImageModal = ({src, onClose}: Props) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} 
          onClick={(e) => e.stopPropagation()}
          // 내부 클릭 막기
        > 
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <Image 
          src={src}
          alt='preview'
          width={900}
          height={600}
          className={styles.image}
          />
      </div>
    </div>
  )
}

export default ImageModal