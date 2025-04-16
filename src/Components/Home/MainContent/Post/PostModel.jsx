import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaAngleLeft, FaUser } from 'react-icons/fa';
import { FaRegFaceSmile, FaUserGroup } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { colors } from '@mui/material';
import { colorData } from './data/colorData';
import { motion } from 'framer-motion';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PostModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const  [openColor, setOpenColor] = React.useState(false);

  return (
    <>
       <div onClick={handleOpen} className="flex-1 h-[40px] rounded-full bg-gray-100 px-4 flex items-center text-gray-500 cursor-pointer hover:bg-gray-200">
      What's on your mind?
    </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='flex justify-center bg-transparent items-center h-screen'>
          <div className=' xl:w-[40%] bg-white lg:w-[50%]  min-h-max-max md:w-[40%] w-full p-4 shadow rounded-md'>
            <h4 className='text-center font-bold my-3'>Create Post</h4>
            <hr className='hr'/>
            <div className="flex items-center gap-3">
               <div className="flex items-center justify-center bg-gray-300 rounded-full h-[40px] w-[40px] text-gray-700">
                 <FaUser size={20} />
               </div>
               <div className='flex flex-col gap-1 justify-content-center'>
                <h5 className='font-semibold'>User Name</h5>
                <div className='px-1 bg-gray-200 flex gap-1 rounded-md items-center'>
                <FaUserGroup />
                <p>Friend Request</p>
                <IoMdArrowDropdown />
                </div>
               </div>
             </div>
              <textarea
              rows={5}
              placeholder=' Whats on your mind? UserName'
              className="w-full p-2rounded-md text-[1.5rem] mt-3 outline-0 post-caption "
              >
              </textarea>
              <div className='flex justify-between items-center '>
              {openColor ? (
                <>
                <div onClick={()=>setOpenColor(false)} className='h-[32px] w-[32px] cursor-pointer flex items-center justify-center bg-gray-200 rounded-lg'>
                <FaAngleLeft className='font-extralight' size={20} />
                </div>
                {colorData?.map((item,index)=>{
                  return(
                    <motion.div
                    initial={{ scale : 0, rotate: 180}}
                    animate={{ scale : 1, rotate: 0}}
                    transition={{ duration : 0.3, delay : index * 0.1, type: 'spring', stiffness: 300}}
                     key={index} style={{
                      background: `linear-gradient(to right, ${item.startColor}, ${item.endColor})`,
                    }} className='h-[32px] w-[32px] cursor-pointer rounded-lg shadow border border-gray-200 '></motion.div> 
                  )
                })}
                </>
              ) : (
                <>
                <img onClick={()=>setOpenColor(true)} src='./assets/MenueImages/picker.png' alt='picker' className='h-[32px] w-[32px] cursor-pointer'/>
                </>
              )}
               
               
                <FaRegFaceSmile className='h-[25px] w-[25px]' />
              </div>
              
          </div>
        </div>
      </Modal>
    </>
  );
}
