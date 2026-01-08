'use client'
import AuthGuard from '@/app/com/AuthGuard'
import ImageRolling from './ImageRolling'

const MyPage = () => {
  return (
    <AuthGuard>
      <section style={{paddingBottom:220, marginTop:200, textAlign:'center'}}>
        <h1>마이페이지</h1>
        <p>내 프로젝트 미리보기</p>

        {/* 하단 이미지 롤링 */}
        <ImageRolling />
      </section>
    </AuthGuard>
  )
}

export default MyPage
