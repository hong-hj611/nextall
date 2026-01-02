// db.ts
import mysql from 'mysql2/promise'

export const db = mysql.createPool({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
})

// export const testdb = async () => {
//   try {
//     const [rows] = await db.query('select 1')
//     // db 접속이 되는지 확인하기 위해
//     console.log('db 연결 성공')
//   } catch (e) {
//     console.error('db 연결 실패', e)
//   }
// }