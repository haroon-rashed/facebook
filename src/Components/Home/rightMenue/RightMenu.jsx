import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { right_menu_data } from './RightMenueData'

const RightMenu = () => {
  return (
    <>
     <div className='shadow px-2 absolute w-[600px] h-[85vh] overflow-y-scroll fixed py-1 bg-gray-100 mt-[47%]  -translate-x-[15%] '>
        <h2 className='text-4xl font-bold text-black my-5 px-3'>Menu</h2>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
            <div className='col-span-2 p-2 bg-white shadow rounded-md'>
                <div className='flex  p-2  justify-between items-center  bg-gray-200 rounded-full'>
                <CiSearch size={25} className='text-gray-400' />
                            <input type='text' placeholder='Search' className=' w-full outline-0 border-0' />
                            </div>
                            <ul className='felx flex-col gap-3 '>
                                {right_menu_data?.map((item,index)=>{
                                    return(<div key={index}>
                                        <li className='text-2xl font-semibold py-2 px-3 w-[40%] whitespace-nowrap'>{item.title}</li>
                                        {item.list?.map((listItem, index2)=>{
                                           return(
                                             <div key={index2} className='flex gap-3 items-center'>
                                                <img src={listItem.image} alt='menu-img'/>
                                                <div className='flex flex-col gap-2 '>
                                                    <h4 className='text-1xl text-black font-semibold '>{listItem.heading}</h4>
                                                    <p className='text-sm  text-gray-400 '>{listItem.description}</p>
                                                </div>
                                             </div>
                                             )
                                        })}
                                    </div>)
                                })}
                            </ul>
            </div>
            <div className='col-span-1 p-2 bg-white shadow rounded-md'></div>
        </div>
     </div> 
    </>
  )
}

export default RightMenu
