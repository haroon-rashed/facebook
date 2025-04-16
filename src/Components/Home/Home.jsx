import React from 'react'
import Navbar from './Navbar'
import SideBar from './MainContent/SideBar'
import HeroSection from './MainContent/HeroSection'
import AddContent from "./MainContent/Post/AddPost.jsx";


const Home = () => {
  return (
    <div>
    <Navbar/>
    <div className='grid md:grid-cols-12 bg-gray-200'>
        <div className='md:col-span-3 col-span-12'>
            <SideBar/>
        </div>
        <div className='md:col-span-6 col-span-12'>
            <HeroSection/>
        </div>
        <div className='md:col-span-3 col-span-12'>
            {/* <AddContent/> */}
        </div>
    </div>
    </div>
  )
}

export default Home
