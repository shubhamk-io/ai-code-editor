import React, { use, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import { me } from './features/me'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'


const App = () => {

   // using dispatch to set user data .
  const dispatch = useDispatch();


  // this effect using for never relode data in every refresh time stay user login 
  useEffect(() => {

    // fetch data in using me fucntion
    const fetch = async () => {
      // me () this is me function
      const data = await me()

      if (data) {
        // set in user data 
        dispatch(setUserData(data))
      }
    }
    fetch();
  }, [])




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App