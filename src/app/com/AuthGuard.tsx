'use client'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/app/lib/firebaseClient'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login')
      } else {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading) return <p style={{textAlign:'center', marginTop:300}}>로딩 중...</p>

  return <>{children}</>
}

export default AuthGuard
