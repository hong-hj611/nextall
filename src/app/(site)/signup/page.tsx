'use client'
import React, { useState } from 'react'
import styles from './page.module.scss'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/app/lib/firebaseClient'

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkpassword, setCheckpassword] = useState('')
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')

  const signupInfo = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password || !checkpassword) {
      setMsg('입력값을 모두 넣어주세요')
      return
    }

    if (password !== checkpassword) {
      setMsg('비밀번호가 일치하지 않습니다')
      return
    }

    try {
      // Firebase 회원가입
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // 이름 저장 (displayName)
      await updateProfile(userCredential.user, {
        displayName: name,
      })

      setMsg('회원가입 성공')
      location.href = '/login'
      
    } catch (error: any) {
      console.error(error)
      switch (error.code) {
        case 'auth/email-already-in-use':
          setMsg('이미 사용 중인 이메일입니다')
          break
        case 'auth/weak-password':
          setMsg('비밀번호는 6자 이상이어야 합니다')
          break
        default:
          setMsg('회원가입 실패')
      }
    }
  }

  return (
    <div className={styles.signupSection}>
      <h1>회원가입</h1>
      <form onSubmit={signupInfo} className={styles.signupInfo}>
        <div className={styles.signupInner}>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="pass">비밀번호</label>
          <input
            id="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="checkpass">비밀번호 확인</label>
          <input
            id="checkpass"
            type="password"
            value={checkpassword}
            onChange={(e) => setCheckpassword(e.target.value)}
          />

          <button type="submit">회원가입</button>
        </div>
      </form>

      <h2>{msg}</h2>
    </div>
  )
}

export default Page
