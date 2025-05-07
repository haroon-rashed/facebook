import React from 'react'
import AddPost from './Post/AddPost'
import GetPosts from '../facebook_main_page/GetPosts'
import Stories from './stories/Stories'

const HeroSection = () => {
  return (
    <div>
       <AddPost/>
       <Stories/>
       <GetPosts/>
    </div>
  )
}

export default HeroSection
