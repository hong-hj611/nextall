'use client'
import React, { useState } from 'react'
import styles from './page.module.scss'

const page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  // form을 통해 값을 서버로 전송하기 위해 함수 만든다(form event 발생시-onSubmit)
  const sendInfo = async (e : React.FormEvent) => {
    // form 이벤트내에서 기본 동작을 막음
    e.preventDefault()

    // fetch로 보내기(전송방식, 헤더타입, 바디에 담길 Json)
    // 'api/auth/login' 서버주소로 route.ts화일을 찾는다
    const res = await fetch('api/auth/login', {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({email, password})
      // 키 : 키값 형식으로 보내야 하지만 이름이 동일하므로 생략. email, password 객체로 보냄
    })

    if(!res.ok) {
      setMsg('서버 오류')
      return
    }

    const data = await res.json()
    if(!data.ok) {
      setMsg(data.message ?? '로그인 실패')
      // 서버에서 받아진 오류 메지지를 출력. 없으면 ?? 뒤의 값 출력
      return
    }
    setMsg('로그인 성공')
    // 로그인 성공하면 / 디렉토리로 이동
    location.href = '/'
  }
  return (
    <div className={styles.loginSection}>
      <h1>로그인</h1>
      <form onSubmit={sendInfo} className={styles.loginWrap}>
        <input type="email" placeholder='이메일' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='패스워드' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>로그인</button>
      </form>
      <h2 style={{color: 'darkgreen'}}>
        {msg}
      </h2>
    </div>
  )
}

export default page