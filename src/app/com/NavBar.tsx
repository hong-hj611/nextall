import React from 'react'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import styles from './NavBar.module.scss'
import Link from 'next/link'
// import LogoutButton from './LogoutButton'

const JWT_COOKIE_NAME = 'next_token'

type UserType = {
  id: number
  name: string
  email: string
}

const NavBar = async () => {

  const cookieStore = await cookies()
  const token = cookieStore.get(JWT_COOKIE_NAME)?.value ?? null

  let user: UserType | null= null

  if (token) {
    try {
      // 받은 인증서 확인 절차(로그인 상태 확인)
      user = jwt.verify(token, process.env.JWT_SECRET!) as UserType
    }catch (e) {
      user = null
    }
  }
  // 로그인 상태 확인
  const isLogin = user

  return (
    <header className={styles.headWrap}>
      <div className={styles.header}>
        <strong><img src="/imgs/next.svg" alt="next logo" /></strong>
        <nav className={styles.nav}>
          <Link href='/'>Home</Link>
          <Link href='/about'>About</Link>
          {/* <Link href='/board'>게시판</Link> */}
          { // 로그인 O 
            !isLogin && (
              <>
              <Link href='/login'>Login</Link>
              <Link href='/signup'>Sign Up</Link> 
              </>
            )
          }
          { // 로그인 X
            isLogin && (
              <>
                <form action={"/api/auth/logout"} method='post' >
                  <button type='submit' className={styles.logoutBtn}>Logout</button>
                </form>
                <Link href='/mypage'>마이페이지 ({user?.name}님)</Link> 
                </>
            )
          }
        </nav>
      </div>
    </header>
  )
}

export default NavBar