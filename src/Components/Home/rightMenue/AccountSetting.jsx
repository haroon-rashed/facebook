import React from 'react'
import { FaPeopleArrows, FaUser } from 'react-icons/fa'
import { FaPeopleLine } from 'react-icons/fa6'
import { account_data } from './AccountData'

const AccountSetting = () => {
  return (
    <>
    <div className='fixed top-0 left-0 w-screen h-screen bg-transparent '></div>
     <div onClick={(e)=>e.stopPropagation()} className='absolute top-full rounded-md shadow-2xl w-[400px] p-2 right-0'>
        <div className='shadow-2xl rounded-md p-3'>
           <div className='flex gap-3 items-center p-2'>
            <div className='flex items-center border border-gray-300 text-gray-200 justify-center bg-gray-300  rounded-full h-[50px] w-[50px]'>
                <FaUser size={30}/>
            </div>
            <p className='text-1xl text-gray-700 font-semibold capitalize '>UserName</p>
           </div>
           <hr className='border-0 bg-gray-300 h-[2px] my-3'/>
           <div className='bg-gray-300 hover:bg-gray-200 p-3 rounded-md flex gap-3 w-[60%] p-3 mx-auto items-center justify-center'>
           <FaPeopleArrows size={20} /><p className='text-black '>See All Profiles</p>
           </div>
        </div>
        <ul className='unstyled flex flex-col gap-3 p-3'>

        {account_data?.map((item,index)=>{
           return(
            <div key={index}>
                <li className='flex justify-between  items-center'>
                    <div className='flex gap-3 items-center'>
                        <div className='h-[50px] w-[50px] rounded-full bg-gray-300 flex items-center justify-center'>
                            {item.icon}
                        </div>
                        <p className='text-1xl font-semibold '>{item.title}</p>
                    </div>
                    <div>{item.arrow}</div>
                </li>
            </div>
           )
        })}
        </ul>
     </div> 
    </>
  )
}

export default AccountSetting
