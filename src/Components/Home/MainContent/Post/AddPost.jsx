import React from 'react'
import { FaUser } from 'react-icons/fa'
import PostModel from './PostModel'
import { motion } from 'framer-motion'

const AddPost = () => {
  return (
    <div>
      <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
       className="xl:w-[80%] md:w-[90%] lg:w-[85%] w-[95%] mx-auto rounded-md my-3 bg-white shadow p-5">
  <div className="flex items-center gap-3">
    <div className="flex items-center justify-center bg-gray-300 rounded-full h-[40px] w-[40px] text-gray-700">
      <FaUser size={20} />
    </div>
   
   <PostModel/>
  </div>
<hr className='hr'/>
<div className='flex justify-around items-center'>
  <div className='flex gap-3 items-center cursor-pointer hover:bg-gray-200 rounded-md p-3 rounded-mdx'>
    <img src='./assets/MenueImages/video_post.png' alt='post'/>
    <p className='text-gray-400'>Live Video</p>
  </div>
  <div className='flex gap-3 items-center cursor-pointer hover:bg-gray-200 rounded-md p-3 rounded-mdx'>
    <img src='./assets/MenueImages/photo_post.png' alt='post'/>
    <p className='text-gray-400'>Phote/Video</p>
  </div>
  <div className='flex gap-3 items-center cursor-pointer hover:bg-gray-200 rounded-md p-3 rounded-mdx'>
    <img src='./assets/MenueImages/feeling_post.png' alt='post'/>
    <p className='text-gray-400'>Feelings</p>
  </div>
</div>
</motion.div>

    </div>
  )
}

export default AddPost
