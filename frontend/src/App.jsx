import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from './firebase'
import { login } from './features/login'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from './pages/Dashboard'

const App = () => {

  const handleLogin = async () => {
    const userData = await signInWithPopup(auth, googleProvider)
    console.log(userData)

    // 1. get token // 2.send token to backend
    const token = await userData.user.getIdToken();
    const data = await login(token)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App