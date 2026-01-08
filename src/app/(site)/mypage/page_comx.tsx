'use client'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/app/lib/firebaseClient'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login') // 비로그인 → 강제 이동 (뒤로가기 방지)
      } else {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading) return <p>로딩 중...</p>

  return (
    <div>
      <h1>마이페이지</h1>
      <p>환영합니다!</p>
    </div>
  )
}

export default page
