import * as React from 'react';
import Modal from '@mui/material/Modal';
import { FaAngleLeft, FaGift, FaSmile, FaUser, FaUserFriends } from 'react-icons/fa';
import { FaRegFaceSmile, FaUserGroup } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { motion } from 'framer-motion';
import { colorData } from './data/colorData';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import BackGroundThemes from './BackGroundThemes';
import { ClockLoader } from 'react-spinners';
import { addPostData, resetPost } from '../../../../features/posts/postSlice';
import { MdPhotoLibrary } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import UploadMedia from '../UploadMedia';
import axios from 'axios';

const PostModal = () => {
  const [open, setOpen] = React.useState(false);
  const [openColor, setOpenColor] = React.useState(false);
  const [caption, setCaption] = React.useState('');
  const [showBg, setShowBg] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [img, setImg] = React.useState(null);
  const [changed, setChanged] = React.useState(false);
  const [show, setShow] = React.useState(false)
  const [media, setMedia] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(false);
  const [mediaSelected, setMediaSelected] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState({
    startColor: 'white',
    endColor: 'white',
    image: '',
  });

  const { user } = useSelector((state) => state.user);
  const { startColor, endColor, image } = selectedColor;
  const { postLoading, postSuccess, postError, postMessage } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCaption('');
    setSelectedColor({
      startColor: 'white',
      endColor: 'white',
      image: '',
    });
    setImg(null);
    setImagePreview(null);
    setMedia(false);
    setMediaSelected(false);
    setOpenColor(false);
  };

  const validatePost = () => {
    if (!caption.trim() && !img) {
      toast.error('Please add a caption or image');
      return false;
    }
    if (!user?._id) {
      toast.error('User not authenticated');
      return false;
    }
    return true;
  };

  const handleImage = async () => {
    const data = new FormData();
    data.append('file', img);
    data.append('upload_preset', 'gfvctg0q');

    try {
      setImageLoading(true);
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/djp0ksyba/image/upload',
        data
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Image upload failed");
      throw err;
    } finally {
      setImageLoading(false);
    }
  };

  const handlePost = async () => {
    if (!validatePost()) return;

    try {
      let uploadedImageUrl = null;
      
      if (img) {
        uploadedImageUrl = await handleImage();
      }

      const postData = {
        caption,
        background: selectedColor,
        user_id: user?._id,
        uploadImage: uploadedImageUrl,
      };

      await dispatch(addPostData(postData)).unwrap();
      
      if (!postError) {
        resetForm();
        setOpen(false);
        toast.success('Post created successfully');
      }
    } catch (error) {
      console.error('Post failed:', error);
      toast.error(postMessage || 'Failed to create post');
    }
  };

  React.useEffect(() => {
    if (postSuccess) {
      resetForm();
      toast.success('Post added successfully');
    }
    if (postError) {
      toast.error(postMessage);
    }
    dispatch(resetPost());
  }, [postSuccess, postError, postMessage, dispatch]);

  return (
    <>
      <div onClick={handleOpen} className="flex-1 h-[40px] rounded-full bg-gray-100 px-1 flex items-center text-gray-500 cursor-pointer hover:bg-gray-200">
        What's on your mind, {user?.f_name} {user?.l_name}?
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div onClick={handleClose} className='flex justify-center bg-transparent items-center h-screen'>
          <div onClick={(e) => e.stopPropagation()} className='xl:w-[40%] min-w-[400px] relative  h-[400px] overflow-y-scroll bg-white overflow-hidden lg:w-[50%] min-h-max md:w-[40%] w-full shadow rounded-md'>
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
            <div className={`relative ${
              media
                ? 'h-[80px]'
                : (selectedColor.image || startColor.toLowerCase() !== '#ffffff' || endColor.toLowerCase() !== '#ffffff')
                  ? 'h-[200px]'
                  : 'h-[150px]'
            }`}>
              <div className={`${
                (selectedColor.image || startColor.toLowerCase() !== '#ffffff' || endColor.toLowerCase() !== '#ffffff')
                  ? 'h-full flex items-center justify-center'
                  : ''
              }`}>
                <textarea
                  onChange={(e) => setCaption(e.target.value)}
                  value={caption}
                  style={{
                    background: image
                      ? `url(${image}) center/cover no-repeat`
                      : `linear-gradient(to right, ${startColor}, ${endColor})`,
                  }}
                  placeholder={`What's on your mind? ${user?.f_name} ${user?.l_name}`}
                  className={`capitalize w-full p-2 rounded-md mt-3 outline-0 post-caption resize-none ${
                    media
                      ? 'h-[30px] text-black text-[1rem]'
                      : (image || startColor.toLowerCase() !== '#ffffff' || endColor.toLowerCase() !== '#ffffff')
                        ? 'h-[200px] text-black text-[2rem]'
                        : 'h-[200px] text-black text-[1rem]'
                  }`}
                />
              </div>
            </div>

            {media && <UploadMedia img={img} setImg={setImg} imagePreview={imagePreview} setImagePreview={setImagePreview} setMedia={setMedia}  mediaSelected={mediaSelected} setMediaSelected={setMediaSelected}/>}

            <div className="flex items-center justify-between px-4 py-2 bg-white rounded-full border border-gray-300 w-full max-w-md mx-auto shadow-sm">
              <span className="text-sm font-medium text-gray-700">Add to your post</span>
              <div className="flex items-center gap-4">
                <MdPhotoLibrary onClick={() => setMedia(true)} className="text-green-500 text-xl cursor-pointer" />
                <FaUserFriends className="text-blue-500 text-xl cursor-pointer" />
                <FaSmile className="text-yellow-500 text-xl cursor-pointer" />
                <FaMapMarkerAlt className="text-red-500 text-xl cursor-pointer" />
                <FaGift className="text-teal-500 text-xl cursor-pointer" />
                <BsThreeDots className="text-gray-600 text-xl cursor-pointer" />
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

            <div className='p-1'>
              <button
                onClick={handlePost}
                className={`w-full font-semibold cursor-pointer ${show ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'} hover:bg-blue-700 mb-1 rounded-md p-1 text-1xl`}
                // disabled={show || postLoading || imageLoading}
              >
                {(postLoading || imageLoading )? <ClockLoader size={20} color='white' className='text-white'/> : 'Add Post'}
              </button>
            </div>

          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostModal;
