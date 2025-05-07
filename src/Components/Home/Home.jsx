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
        <div className='xl:col-span-3  xl:block hidden'>
            <SideBar/>
        </div>
        <div className='xl:col-span-6 lg:col-span-8 sm:col-span-12'>
            <HeroSection/>
        </div>
        <div className='xl:col-span-3 lg:col-span-4 md:block  hidden '>
            {/* <AddContent/> */}
        </div>
    </div>
    </div>
  )
}

export default Home
