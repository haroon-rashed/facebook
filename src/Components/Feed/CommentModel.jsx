import * as React from 'react';
import { Box, Modal, Avatar } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import { FaRegComment } from 'react-icons/fa';
import { PiShareFat } from 'react-icons/pi';
import { RxAvatar } from 'react-icons/rx';
import { BsEmojiSmile } from 'react-icons/bs';
import { BiSolidSend } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { addCommentData } from '../../features/posts/postSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  p: 0,
  display: 'flex',
  flexDirection: 'column',
};

export default function CommentModel({post_id}) {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const user = { f_name: 'Haroon Rasheed' };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  const handleComment = () => {
      const commentData = {
        comment,post_id
      }
      dispatch(addCommentData(commentData))
  };

  return (
    <>
      <div onClick={handleOpen} className="flex gap-1 items-center cursor-pointer">
        <FaRegComment className="text-gray-600" />
        <h6 className="font-semibold text-sm text-gray-600">Comment</h6>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
        
          <div className="flex items-center rounded-md justify-between p-2 border-b sticky top-0 bg-white z-10">
            <h1 className="text-sm font-bold">I Am Quetta's post</h1>
            <IoMdClose onClick={handleClose} className="cursor-pointer text-lg" />
          </div>

          
          <div className="flex-1 overflow-y-auto scrollbar-hidden p-3 space-y-3">
            
            <div className="flex items-center gap-2">
              <Avatar />
              <div>
                <h1 className="text-sm font-bold">I Am Quetta</h1>
                <p className="text-xs text-gray-500">14 May at 22:56 · 🙂</p>
              </div>
            </div>

          
            <p className="text-sm">
              زندگی میں محنت جاری رکھیں جب تک منزل تک پہنچ نہ جائیں 🙂
            </p>

            
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
              alt="Post"
              className="w-full h-52 object-cover rounded-md"
            />

            
            <div className="flex justify-around items-center text-gray-600 text-sm border-t pt-2">
              <span className="cursor-pointer">Like</span>
              <span className="cursor-pointer">Comment</span>
              <span className="cursor-pointer">Share</span>
            </div>

           
            <div className="space-y-2">
              <div className="flex gap-2 items-start">
                <RxAvatar className="text-xl mt-1" />
                <div className="bg-gray-100 p-2 rounded-md text-sm">
                  <h4 className="font-semibold">Ali</h4>
                  <p>Very true 👏</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <RxAvatar className="text-xl mt-1" />
                <div className="bg-gray-100 p-2 rounded-md text-sm">
                  <h4 className="font-semibold">Sara</h4>
                  <p>Powerful message 💯</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 border-t sticky -bottom-200px rounded-md bg-white z-10">
            <div className="flex items-start gap-2">
              <RxAvatar className="text-2xl mt-1" />
              <div className="flex flex-col w-full">
                <textarea
                  rows="2"
                  placeholder={`Comment as ${user.f_name}`}
                  className="w-full border rounded-2xl px-4 py-2 text-sm outline-none resize-none bg-gray-100"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex items-center justify-between mt-1 px-1">
                  <div className="flex items-center gap-3 text-gray-600">
                    <BsEmojiSmile className="text-xl cursor-pointer" />
                    <PiShareFat className="text-xl cursor-pointer" />
                    <FaRegComment className="text-xl cursor-pointer" />
                  </div>
                  <BiSolidSend
                    className="text-xl cursor-pointer text-gray-500"
                    onClick={handleComment}
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
