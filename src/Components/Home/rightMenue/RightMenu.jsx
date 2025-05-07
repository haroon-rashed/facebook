import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { right_menu_data } from './RightMenueData';
import { left_data } from './LeftData';

const RightMenu = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-transparent z-10"></div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="shadow-lg absolute w-[500px] h-[85vh] overflow-y-scroll fixed py-2 bg-white mt-[47%] -translate-x-[15%] rounded-md z-50"
      >
        <h2 className="text-2xl font-bold text-black px-4 py-3 bg-white sticky top-0 z-20 border-b border-gray-200">
          Menu
        </h2>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 p-3">
          {/* Left Side - Menu Content */}
          <div className="col-span-2 bg-white shadow-sm rounded-md p-3">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full mb-4">
              <CiSearch size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            {/* Menu List */}
            <ul className="flex flex-col gap-4">
              {right_menu_data?.map((item, index) => (
                <li key={index} className="w-full">
                  <div className="text-lg font-semibold py-2 px-1">
                    {item.title}
                  </div>

                  {item.list?.map((listItem, index2) => (
                    <div
                      key={index2}
                      className="flex gap-3 hover:bg-gray-100 rounded-md items-center px-2 py-2 transition"
                    >
                      <img
                        src={listItem.image}
                        alt="menu-img"
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex flex-col">
                        <h4 className="text-sm font-medium text-black">
                          {listItem.heading}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {listItem.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  <hr className="border-t border-gray-200 mt-3" />
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 bg-white shadow-sm rounded-md p-3 sticky top-0 self-start">
            <h2 className="text-xl font-semibold text-black mb-4">Create</h2>
            <ul className="flex flex-col gap-2">
              {left_data?.map((item, index) => (
                <div key={index}>
                  <li className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-md transition">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex justify-center items-center text-black text-sm">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-medium text-black">
                      {item.title}
                    </h3>
                  </li>
                  {index === 3 && (
                    <hr className="border-0 bg-gray-200 h-[1px] my-1" />
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightMenu;
