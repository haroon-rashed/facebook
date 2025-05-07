import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaGlobe, FaRegComment, FaUser } from 'react-icons/fa'
import { TbShare3 } from "react-icons/tb";
import { FiThumbsUp } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const GetPosts = () => {
  return (
    <>
      <div className="xl:w-[80%] md:w-[90%] lg:w-[85%] w-[95%] mx-auto rounded-md my-3 bg-white shadow ">
        <div className='flex justify-between items-center p-5'>
          <div className='flex items-center gap-3'>
             <div className="flex items-center justify-center bg-gray-300 rounded-full h-[40px] w-[40px] text-gray-700">
                            <FaUser size={20} />
                          </div>
                          <div className="flex flex-col gap-1 justify-center ">
                           <div className='text-gray-900 '>Muhammad Ibrahim</div>
                           <div className='flex item-center gap-1'>
                             <div className='text-gray-500 '>Asif Ali</div>
                            <div className='text-gray-500 '>.   1 day ago</div>
                            <div className='text-gray-500 cursor-pointer'><FaGlobe/></div>
                           </div>
                          </div>
          </div>
          <div className='flex gap-2 items-center'>
          <div className='text-gray-900 cursor-pointer'><BsThreeDots size={25} /></div>
          <div className='text-gray-900 cursor-pointer'><RxCross2 size={25} /></div>
          </div>
        </div>
          <div className='text-gray px-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis officiis veritatis eius rerum culpa dolore! Sint iure perferendis nam ad ex dignissimos facere sed. Illum sed veniam ut in, nulla, quidem ad, laboriosam aperiam velit alias omnis nostrum eveniet non!</div>
        <div className='h-[400px] bg-green-500'></div>
        <p className='text-gray-600 py-2 px-5'>You and 16 Others</p>
        <hr className='hr'/>
        <div className='flex items-center justify-around w-full p-1'>
          <div className='flex gap-1 justify-center hover:bg-gray-300 w-full p-2 rounded-md cursor-pointer text-gray-700 items-center'>
            <FiThumbsUp  size={20}/>
            <p className='text-gray-600'>Like</p>
          </div>
          <div className='flex gap-1 justify-center hover:bg-gray-300 w-full p-2 rounded-md cursor-pointer text-gray-700 items-center'>
            <FaRegComment size={20}/>
            <p className='text-gray-600'>Comment</p>
          </div>
          <div className='flex gap-1 justify-center hover:bg-gray-300 w-full p-2 rounded-md cursor-pointer text-gray-700 items-center'>
            <TbShare3 size={25}/>
            <p className='text-gray-600'>Share</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default GetPosts
