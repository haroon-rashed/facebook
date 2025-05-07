import React from 'react'
import "./globals.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/Auth_Pages/SignUpPage'
import HomePage from './Pages/Home/HomePage'
import  { Toaster } from 'react-hot-toast';
import OTPVerification from './Authintcation/OTPVerification'
import Friends from './Components/Home/friends/Friends'
import FundraisersPage from './Components/Home/SidebarComponents/Fundraisers/FundraisersPage'
const App = () => {
  return (
    <>
     <Router>
     <Toaster/>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/otp' element={<OTPVerification/>}/>
        <Route path='/register' element={<SignUpPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/friends' element={<Friends/>}/>
        <Route path='/fundraisers' element={<FundraisersPage/>}/>
      </Routes>
     </Router> 
    </>
  )
}

export default App
