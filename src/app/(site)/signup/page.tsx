'use client'
import React, { useState } from 'react'
import styles from './page.module.scss'

const page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [checkpassword, setCheckpassword] = useState('')
  
  const signupInfo = async (e : React.FormEvent) => {
    e.preventDefault()

    // client 부분에서 처리후 서버로 넘긴다 (입력값 유무 / 비밀번호 확인)
    if (!name || !email || !password || !checkpassword) {
      setMsg('입력값을 모두 넣어주세요')
      return 
    }
    if (password !== checkpassword) {
      setMsg('비밀번호가 일치하지 않습니다')
      return
    }

    try {
      // 서버에 자료전송
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({name, email, password, checkpassword})
      })

      if (!res.ok) {
        setMsg('서버 오류')
        return
      }

      const data = await res.json()
      if (!data.ok) {
        setMsg(data.message ?? '회원가입 실패')
        return
      }

      setMsg('회원가입 성공')
      location.href = '/login'

    }catch (e) {
      console.error(e)
    }
    
  }
  return (
    <div className={styles.signupSection}>
      <h1>회원가입</h1>
      <form onSubmit={signupInfo} className={styles.signupInfo}>
        <div className={styles.signupInner}>
          <label htmlFor="name">이름</label>
            <input id="name" type="text" value={name} 
              onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">이메일</label>
            <input id='email' type="email" value={email} 
              onChange={(e) => setEmail(e.target.value)} 
          />
          <label htmlFor="pass">비밀번호</label>
            <input id='pass' type="password" value={password} 
              onChange={(e) => setPassword(e.target.value)} 
          />
          <label htmlFor="checkpass">비밀번호 확인</label>
            <input id='checkpass' type="password" value={checkpassword} 
              onChange={(e) => setCheckpassword(e.target.value)} 
          />
            
          <button type='submit'>회원가입</button>
        </div>
      </form>
      <h2>{msg}</h2>
    </div>
  )
}

export default page