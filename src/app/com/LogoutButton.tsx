'use client'
import { useRouter } from "next/navigation" 

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {method: 'POST'})
    // router.push('/login')
    router.refresh()
  }
  
  return (
    <button onClick={handleLogout} style={{border:'none', background: 'none'}}>로그아웃</button>
  )
}

export default LogoutButton