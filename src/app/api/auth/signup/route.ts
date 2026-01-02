import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const COOKIE_NAME = 'next_token'

export async function POST(req:Request) {
  const {name, email, password, checkpassword} = await req.json()

  if (!email || !password || !name || !checkpassword) {
    return NextResponse.json({ok: false, message: '입력값 누락'})
  }
  if (password !== checkpassword) {
    return NextResponse.json({ok: false, message : '비밀번호 불일치'})
  }
  try {
  // email unique 확인 작업 (같은 email 있는지?)
  const [rows] : any = await db.query('select id, email from users where email = ? limit 1', [email])
  if (rows.length > 0) {
    return NextResponse.json({ok: false, message: '가입된 이메일 존재함 '})
  }

  // 비밀번호를 bcrypt로 변환 ()
  const hashed = await bcrypt.hash(password, 10);

    await db.query(
      `insert into users (email, password, name) values (?, ?, ?)`, [email, hashed, name]
    )
    return NextResponse.json({ok: true})
  }catch (e) {
    console.error('서버 DB 오류 ')
    return NextResponse.json({ok: false, message: '서버오류'})
  }
}