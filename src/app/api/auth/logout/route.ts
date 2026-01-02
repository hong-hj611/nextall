import { NextResponse } from "next/server";
// 쿠키 기억장소 이름
const JWT_COOKIE_NAME = 'next_token'

export async function POST() {
  //const res = NextResponse.json({ok: true})  // 로그인 된 상태이므로 true

  const res = NextResponse.redirect(
    new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'), {status: 303}
  )
  // 쿠키 삭제 설정
  res.cookies.set({
    name: JWT_COOKIE_NAME,
    value: '',
    httpOnly: true,
    path:'/',
    maxAge: 0  // 즉시만료
  })

  return res
}