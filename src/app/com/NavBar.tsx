'use client'
import React, { useEffect, useState } from 'react'
import styles from './NavBar.module.scss'
import Link from 'next/link'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/app/lib/firebaseClient'

const NavBar = () => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // 로그인 상태 감지
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    location.href = '/'
  }

  const isLogin = !!user

  return (
    <header className={styles.headWrap}>
      <div className={styles.header}>
        <strong>
          <img src="/imgs/next.svg" alt="next logo" />
        </strong>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          {/* <Link href='/board'>Board</Link> */}
          {!isLogin && (   // 로그인 O 
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
          {isLogin && (   // 로그인 X
            <>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
              <Link href="/mypage">
                Mypage ({user.displayName ?? '사용자'}님)
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default NavBar