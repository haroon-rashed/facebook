import React from 'react'
import LoginForm from '../../Authintcation/LoginForm'

const Login = () => {
  return (
    <>
      <div className='grid ms-auto min-h-screen w-[90%] grid-cols-1 md:grid-cols-2 items-center '>
        <div className='flex flex-col gap-2  '>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Facebook_logo_%282023%29.svg/2560px-Facebook_logo_%282023%29.svg.png' className='w-[300px] '/>
            <h2 className='text-3xl text-[#1C1E21] '>Facebook helps you connect and share with the people in your life.</h2>
        </div>
        <LoginForm/>
        
      </div>
    </>
  )
}

export default Login
