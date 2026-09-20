import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from './firebase'
import { login } from './features/login'


const App = () => {

  const handleLogin = async () => {
    const userData = await signInWithPopup(auth, googleProvider)
    console.log(userData)

    // 1. get token // 2.send token to backend
    const token = await userData.user.getIdToken();
    const data = await login(token)
  }
  return (
    <div
      onClick={handleLogin}
      className='bg-yellow-600 cursor-pointer'>Login page</div>
  )
}

export default App