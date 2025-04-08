import React from 'react'
import "./globals.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/Auth_Pages/SignUpPage'
import HomePage from './Pages/Home/HomePage'

const App = () => {
  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/registor' element={<SignUpPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
     </Router> 
    </>
  )
}

export default App
