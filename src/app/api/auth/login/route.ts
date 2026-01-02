// 서버 역할을 위해 api\auth\login\route.ts 화일생성
import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";  // 비밀번호 암호화
import jwt from "jsonwebtoken"; // 서버가 발급하는 인증서 토큰

const JWT_COOKIE_NAME ='next_token'

// login/page.tsx에서 보낸 email, password를 받기 위해 POST 방식 사용
export async function POST(req:Request) {
  // 객체 형식으로 변수 지정(login/page.tsx에서 객체로 보냄)
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ok: false, message: '입력값 누락'})
  }

  // email, password가 있다면 try~구문안에 [rows]에 데이터베이스 연결해서 정보를 받아 담아라
  try {
    // rows의 타입은 정확히 모르면 any로 설정
    const [rows]:any = await db.query(
      'select id, email, name, password from users where email=? limit 1', [email])
      // DB 조회 : email이 같은 1개의 정보를 가져와라!!!  --- ? 대응 [email]

    // 값이 없으면 나감, 값이 있으므로 배열로 받은 rows를 담아둔다
    if (rows.length === 0) {
      return NextResponse.json({ok: false, message: '이메일이 없음'})
    }
    const user = rows[0]

    // 비밀번호 확인 절차(true, false) - bcrypt.compare(input으로 받은값과 req로 받아온 값을 비교한다)
    const ok = await bcrypt.compare(password, user.password)

    if (!ok) {
      return NextResponse.json({ok: false, message:'비밀번호가 다름'})
    }

    // 토큰발급하기 : jwt.sign(payload(사용자 기본 정보), secretKey, options(유효기간))
    const token = jwt.sign(
      {id: user.id, name: user.name}, process.env.JWT_SECRET!,
      {expiresIn: '2d'} )
    
    // 모든것이 완벽하다면~ ok: true
    const res = NextResponse.json({ok: true, message: '로그인 성공!'})
    
    // cookie에 값을 세팅하여
    res.cookies.set({
      name: JWT_COOKIE_NAME,  // 쿠키 기억장소 이름
      value: token,  // 값: 만들어놓은 token(인증서)
      httpOnly: true,  // 방식: 브라우저에서만
      path: '/',  // 인증서 관리 위치
      maxAge: 60 * 60 * 24 * 2  // 유효시간( 초단위 )
    })

    return res

  }catch (e) {
    console.error('Error 발생', e)
    return NextResponse.json({ok: false, message: '서버오류'})
  }
}