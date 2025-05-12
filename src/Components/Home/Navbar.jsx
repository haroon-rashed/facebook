import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
import { navbar_data } from "../../Data/NavbarData";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { HiMiniBell } from "react-icons/hi2";
import { FaFacebookMessenger, FaUser } from "react-icons/fa";
import RightMenu from "./rightMenue/RightMenu";
import AccountSetting from "./rightMenue/AccountSetting";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Messenger from "./Messenger";

const Navbar = () => {
  const [focused, setFocused] = useState(false);
  // const [messenger, setMessenger] = useState(false);
  const [setting, setSetting] = useState(false);
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="flex justify-between p-3 sticky top-0 z-100 bg-white">
        <div className="flex gap-3 items-center w-[280px]">
          {focused ? (
            <IoIosArrowRoundBack
              size={35}
              className="transition-all duration-200"
            />
          ) : (
            <img src="./assets/fb_logo.png" width={"40px"} />
          )}

          <div className={`flex p-2 justify-between items-center bg-gray-200 rounded-full transition-all duration-300 ${focused ? "shadow-2xl" : ""}`}>
            {focused ? "" : <CiSearch size={25} className="text-gray-400" />}
            <input
              type="text"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search"
              className="outline-0 md:w-full w-[50%]  border-0 bg-transparent"
            />
          </div>
        </div>
        
        <ul className="lg:flex gap-4 hidden items-center ">
          {navbar_data?.map((item, index) => (
             <Link to={item.link} key={index}>
            <li
              key={index}
              className="px-10 py-3 relative group cursor-pointer rounded-md transition-colors duration-200 hover:bg-gray-300"
            >
              {item.icon}
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-black text-white rounded-md py-2 px-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {item.title}
              </div>
            </li>
             </Link>
          ))}
        </ul>

        <div className="flex gap-3 items-center">
          <div
            onClick={() => setMenu(!menu)}
            className="h-[40px] w-[40px] rounded-full relative cursor-pointer bg-gray-300 hover:bg-gray-200 flex items-center justify-center z-50"
          >
            <BsFillGrid3X3GapFill
              className={`${menu ? "text-blue-500 z-30" : ""}`}
              size={25}
            />
            {menu && <RightMenu />}
          </div>
          <div className="h-[40px] w-[40px] rounded-full  cursor-pointer bg-gray-300 hover:bg-gray-200 flex items-center justify-center ">
            <FaFacebookMessenger  size={25} />
            {/* { messenger && <Messenger/>} */}
          </div>
          <div className="h-[40px] w-[40px] rounded-full  cursor-pointer bg-gray-300 hover:bg-gray-200 flex items-center justify-center ">
            <HiMiniBell size={25} />
          </div>
          <div  onClick={()=>setSetting(!setting)} className="relative group h-[40px] w-[40px] rounded-full cursor-pointer bg-gray-300 hover:bg-gray-200 flex items-center justify-center">
            <FaUser size={25} />
             {setting ?  <AccountSetting/> : "" }
            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-black text-white rounded-md py-2 px-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              account
            </div>

            <div className="absolute w-[20px] h-[20px] flex justify-center items-center rounded-full bg-gray-300 bottom-0 right-0">
              <RiArrowDropDownLine size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;