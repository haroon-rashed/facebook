import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaAngleLeft, FaUser } from 'react-icons/fa';
import { FaRegFaceSmile, FaUserGroup } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { motion } from 'framer-motion';
import { colorData } from './data/colorData';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import BackGroundThemes from './BackGroundThemes';
import { ClockLoader } from 'react-spinners';
import { addPostData, resetPost } from '../../../../features/posts/postSlice';

const PostModal = () => {
  const [open, setOpen] = React.useState(false);
  const [openColor, setOpenColor] = React.useState(false);
  const [caption, setCaption] = React.useState('');
  const [showBg, setShowBg] = React.useState(false);
  const [changed, setChanged] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState({
    startColor: 'white',
    endColor: 'white',
    image: '',
  });

  const { user } = useSelector((state) => state.user);
  const { startColor, endColor, image } = selectedColor;
  const {posts, postLoading, postSuccess, postError , postMessage} = useSelector((state) => state.album);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const dispatch = useDispatch();
  const handlePost = () => {
      const postData = {  
        caption,
        background: selectedColor,
        user_id: user?._id
      }
      dispatch(addPostData(postData))

  }

  React.useEffect(() => {
    if (caption.length > 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [caption]);

  React.useEffect(()=>{
    if(postSuccess){
      toast.success('Post added successfully' )
      setOpenColor(false);
      setCaption('')
      setOpen(false)
    }
    if(postError){
      toast.error(postMessage)
    }
    dispatch(resetPost())

  },[postSuccess, postError, postMessage])

  return (
    <>
      <div onClick={handleOpen} className="flex-1 h-[40px] rounded-full bg-gray-100 px-4 flex items-center text-gray-500 cursor-pointer hover:bg-gray-200">
        What's on your mind, {user?.f_name} {user?.l_name}?
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div onClick={handleClose} className='flex justify-center bg-transparent items-center h-screen'>
          <div onClick={(e) => e.stopPropagation()} className='xl:w-[40%] relative bg-white overflow-hidden lg:w-[50%] min-h-max md:w-[40%] w-full shadow rounded-md'>
            <h4 className='text-center font-bold my-3'>Create Post</h4>
            <hr className='hr' />
            <div className="flex items-center p-4 gap-3">
              <div className="flex items-center justify-center bg-gray-300 rounded-full h-[40px] w-[40px] text-gray-700">
                <FaUser size={20} />
              </div>
              <div className='flex flex-col gap-1'>
                <h5 className='font-semibold'>{user?.f_name} {user?.l_name}</h5>
                <div className='px-1 bg-gray-200 flex gap-1 rounded-md items-center'>
                  <FaUserGroup />
                  <p>Friend Request</p>
                  <IoMdArrowDropdown />
                </div>
              </div>
            </div>

            <div className={`relative ${changed ? "h-[300px]" : "h-[200px]"}`}>
              <div className={`${changed ? "h-full flex items-center justify-center" : ""}`}>
                <textarea
                  onChange={(e) => setCaption(e.target.value)}
                  value={caption}
                  style={{
                    background: image
                      ? `url(${image}) center/cover no-repeat`
                      : `linear-gradient(to right, ${startColor}, ${endColor})`,
                  }}
                  placeholder={`What's on your mind? ${user?.f_name} ${user?.l_name}`}
                  className={`capitalize ${
                    changed ? "h-[250px] text-white text-[2rem]" : "h-[200px]"
                  } ${
                    selectedColor.startColor === colorData[0]?.startColor &&
                    selectedColor.endColor === colorData[0]?.endColor &&
                    !image ? "text-black" : "text-white"
                  } w-full p-2 rounded-md mt-3 outline-0 post-caption`}
                />
              </div>
            </div>

            <div className='flex justify-between p-4 items-center'>
              {openColor ? (
                <>
                  <div
                    onClick={() => setOpenColor(false)}
                    className='h-[32px] w-[32px] cursor-pointer flex items-center justify-center bg-gray-200 rounded-lg'
                  >
                    <FaAngleLeft size={20} />
                  </div>
                  <div className="flex gap-2 overflow-x-scroll hide-scrollbar">
                    {colorData?.map((item, index) => (
                      <motion.div
                        onClick={() => {
                          index === 9 ? setShowBg(true) :
                          setSelectedColor(index === 8
                            ? { startColor: '', endColor: '', image: item.image }
                            : { startColor: item.startColor, endColor: item.endColor, image: '' });
                          setChanged(index !== 0);
                        }}
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1,
                          type: 'spring',
                          stiffness: 300
                        }}
                        key={index}
                        style={{
                          background: index === 8 || index === 9
                            ? `url(${item.image}) center/cover no-repeat`
                            : `linear-gradient(to right, ${item.startColor}, ${item.endColor})`,
                        }}
                        className='h-[32px] w-[32px] cursor-pointer rounded-lg shadow border border-gray-200'
                      />
                    ))}
                  </div>
                </>
              ) : (
                <img
                  onClick={() => setOpenColor(true)}
                  src='./assets/MenueImages/picker.png'
                  alt='picker'
                  className='h-[32px] w-[32px] cursor-pointer'
                />
              )}
              <FaRegFaceSmile className='h-[25px] w-[25px]' />
            </div>
            <BackGroundThemes setSelectedColor={setSelectedColor} showBg={showBg} setShowBg={setShowBg} />
            <div className='p-2'>
              <button
              onClick={handlePost}
                className={`w-full font-semibold  cursor-pointer ${show ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} hover:bg-blue-700 mb-3 rounded-md p-2 text-1xl`}
                disabled={show || postLoading}
              >
                {postLoading ? <ClockLoader/> : 'Add Post'}
              </button>
            </div>

          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostModal;
