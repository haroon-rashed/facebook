import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { right_menu_data } from './RightMenueData'
import { left_data } from './LeftData'

const RightMenu = () => {
   
  return (
    <>
    <div className='fixed top-0 left-0 w-screen h-screen bg-transparent '></div>
     <div onClick={(e)=>e.stopPropagation()} className='shadow  absolute w-[600px] h-[85vh] overflow-y-scroll fixed py-1 bg-white mt-[47%]  -translate-x-[15%] '>
        <h2 className='text-4xl font-bold text-black my-5 px-3 bg-white sticky top-0'>Menu</h2>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
            <div className='col-span-2 p-2 bg-white shadow rounded-md'>
                <div className='flex  p-2  justify-between items-center  bg-gray-200 rounded-full'>
                <CiSearch size={25} className='text-gray-400' />
                            <input type='text' placeholder='Search' className=' w-full outline-0 border-0' />
                            </div>
                            <ul className="flex flex-col gap-3">
  {right_menu_data?.map((item, index) => (
    <li key={index} className="w-full">

      <div className="text-2xl font-semibold py-2 px-3 w-[40%] whitespace-nowrap">
        {item.title}
      </div>


      {item.list?.map((listItem, index2) => (
        <div
          key={index2}
          className="flex gap-3 hover:bg-gray-300 rounded items-center px-3 py-2"
        >
          <img
            src={listItem.image}
            alt="menu-img"
            className="w-10 h-10 object-cover"
          />
          <div className="flex flex-col gap-1">
            <h4 className="text-lg text-black font-semibold">
              {listItem.heading}
            </h4>
            <p className="text-sm text-gray-400">{listItem.description}</p>
          </div>
        </div>
      ))}

   
      <hr className="border-t border-gray-300 mt-3" />
    </li>
  ))}
</ul>


            </div>
            <div className='col-span-1 p-2 bg-white shadow rounded-md self-start z-30 sticky top-0'>
            <h2 className='text-2xl font-semibold text-black my-5 px-3 '>Create</h2>
            <ul className='unstyled flex flex-col gap-2 '>
                {left_data?.map((item,index)=>{
                    return (
                        <div key={index}>
                            <li className='flex gap-3 items-center hover:bg-gray-200 rounded-md '>
                                <div className='w-[40px] h-[40px] rounded-full bg-gray-300 flex justify-center items-center p-1'>{item.icon}</div>
                                <h3 className='text-1xl text-black font-semibold  '>{item.title}</h3>
                            </li>
                            {index == 3 ? <hr className='border-0 bg-gray-200 mt-1 h-[2px]'/> : <></> }
                        </div>
                    )
                })}
            </ul>
            </div>
        </div>
     </div> 
    </>
  )
}

export default RightMenu
