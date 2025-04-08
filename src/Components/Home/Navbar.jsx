import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { navbar_data } from '../../Data/NavbarData';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { HiMiniBell } from 'react-icons/hi2';
import { FaFacebookMessenger, FaUser } from 'react-icons/fa';
import RightMenu from './rightMenue/RightMenu';

const Navbar = () => {
    const [focused, setFocused] = useState(false);
  return (
    <>
     <div className='flex justify-between p-3 '>
        <div className={`flex gap-3 items-center transition-all duration-300 ${focused && "shadow-2xl rounded-md p-2"}`} >
        {focused ? <IoIosArrowRoundBack size={35} className={`transition-all duration-200 ${focused ? 'translate-x-0': '-translate-x-[50px]'}  `} /> :  <img src='./assets/fb_logo.png' width={'40px'}/>}
           
            <div className='flex  p-2  justify-between items-center  bg-gray-200 rounded-full'>
           {focused ? "" :  <CiSearch size={25} className='text-gray-400' />}
            <input type='text' onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} placeholder='Search' className='outline-0 border-0' />
            </div>
        </div>
        <ul className="flex gap-4 items-center">
  {navbar_data?.map((item, index) => (
    <li
      key={index}
      className="px-10 py-3 relative group cursor-pointer rounded-md transition-colors duration-200 hover:bg-gray-300"
    >
      {item.icon}
      <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-black text-white rounded-md py-2 px-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
        {item.title}
      </div>
    </li>
  ))}
</ul>



<div className='flex gap-3 items-center '>
<div className='h-[50px] w-[50px] rounded-full  cursor-pointer  bg-gray-400 hover:bg-gray-200 flex items-center justify-center '>
<BsFillGrid3X3GapFill size={30} />
<RightMenu/>
</div>
<div className='h-[50px] w-[50px] rounded-full  cursor-pointer bg-gray-400 hover:bg-gray-200 flex items-center justify-center '>
<FaFacebookMessenger size={30} />
</div>
<div className='h-[50px] w-[50px] rounded-full  cursor-pointer bg-gray-400 hover:bg-gray-200 flex items-center justify-center '>
<HiMiniBell size={30} />
</div>
<div className='h-[50px] w-[50px] rounded-full  cursor-pointer bg-gray-400 hover:bg-gray-200 flex items-center justify-center '>
<FaUser size={30} />
</div>
</div>
     </div>
    </>
  )
}

export default Navbar
