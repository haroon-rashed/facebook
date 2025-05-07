import React from 'react';
import { FaUser, FaPeopleArrows } from 'react-icons/fa';
import { account_data } from './AccountData';

const AccountSetting = () => {
  return (
    <>
      <div className='fixed top-0 left-0 w-screen h-screen bg-transparent'></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className='absolute top-full right-0 w-[360px] bg-white rounded-xl shadow-2xl p-4 z-50'
      >
        {/* User Info */}
        <div className='p-2 border-b border-gray-200'>
          <div className='flex gap-3 items-center'>
            <div className='h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white'>
              <FaUser size={20} />
            </div>
            <p className='text-base text-gray-800 font-semibold capitalize'>Username</p>
          </div>
        </div>
        <div className='my-4'>
          <div className='bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer p-3 rounded-lg flex gap-3 items-center justify-center text-sm font-medium text-gray-700'>
            <FaPeopleArrows size={16} />
            <span>See All Profiles</span>
          </div>
        </div>

        <ul className='flex flex-col gap-2'>
          {account_data.map((item, index) => (
            <li
              key={index}
              className='flex justify-between items-center hover:bg-gray-100 transition-colors p-3 rounded-lg cursor-pointer'
            >
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600'>
                  {item.icon}
                </div>
                <span className='text-sm font-medium text-gray-800'>{item.title}</span>
              </div>
              {item.arrow && <div className='text-gray-400'>{item.arrow}</div>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AccountSetting;
