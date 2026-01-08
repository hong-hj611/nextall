'use client'
import React, { useState } from 'react'
import styles from './page.module.scss'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/app/lib/firebaseClient'

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

 // form을 통해 값을 서버로 전송하기 위해 함수 만든다(form event 발생시-onSubmit)
  const sendInfo = async (e: React.FormEvent) => {
    // form 이벤트내에서 기본 동작을 막음
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setMsg('로그인 성공')
      location.href = '/'

    } catch (e: any) {
      console.error(e)
      switch (e.code) {
        case 'auth/user-not-found':
          setMsg('존재하지 않는 이메일')
          break
        case 'auth/wrong-password':
          setMsg('비밀번호가 틀림')
          break
        default:
          setMsg('로그인 실패')
      }
    }
  }

  return (
    <div className={styles.loginSection}>
      <h1>로그인</h1>
      <form onSubmit={sendInfo} className={styles.loginWrap}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="패스워드"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
      <h2 style={{ color: 'darkgreen' }}>{msg}</h2>
    </div>
  )
}

export default Page
