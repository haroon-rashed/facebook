import React from "react";
import { FaGlobe, FaRegComment, FaUser } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { PiShareFat } from "react-icons/pi";
import moment from "moment";
import EmojiReactions from "../../Feed/EmojiReactions";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CommentModel from "../../Feed/CommentModel";

const GetPosts = ({ 
  background = {
    startColor: '#ffffff',
    endColor: '#ffffff',
    image: ''
  }, 
  caption, 
  _id, 
  user_id, 
  createdAt, 
  uploadImage,
  comments
}) => {
  const hasUploadImage = Boolean(uploadImage);
  const hasBackgroundImage = Boolean(background?.image);
  const isWhiteBackground = 
    background?.startColor === '#ffffff' && 
    background?.endColor === '#ffffff' && 
    !hasBackgroundImage;
  const hasColorBackground = !isWhiteBackground && !hasBackgroundImage;

  const {user} = useSelector((state)=> state.user)
  const {f_name, l_name} = user;

  const [likes, setLikes] = useState([])

  const getLikes = async( )=>{
    const response = await axios.get(`http://localhost:5180/api/posts/get-reactions/${_id}`)
    setLikes(response.data)
  }
  useEffect(()=>{
    getLikes()
  },[])

  return (
    <div className="shadow-lg xl:w-[80%] mx-auto lg:w-[80%] md:w-[90%] w-[95%] bg-white rounded-md my-2">
      {/* User header */}
      <div className="flex p-3 justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-[45px] h-[45px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
            <FaUser size={25} className="text-gray-600" />
          </div>
          <div>
            <h6 className="font-semibold text-sm">
              {f_name ? f_name : "User"} {l_name}
            </h6>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>
                {moment().diff(moment(createdAt), "hours") < 24
                  ? moment(createdAt).fromNow()
                  : moment(createdAt).format("MMM D, YYYY")}
              </span>
              <span className="h-[2px] w-[2px] bg-gray-500 rounded-full" />
              <FaGlobe />
            </div>
          </div>
        </div>
      </div>

      {/* Post content */}
      {isWhiteBackground && !hasUploadImage && (
        <p className="text-gray-900 p-3 my-2 capitalize">{caption}</p>
      )}

      {hasColorBackground && !hasUploadImage && (
        <div 
          className="h-[400px] relative flex items-center justify-center"
          style={{
            background: `linear-gradient(to right, ${background.startColor}, ${background.endColor})`
          }}
        >
          <p className="text-white text-4xl capitalize p-4 text-center">
            {caption}
          </p>
        </div>
      )}

      {hasUploadImage && (
        <>
          {caption && (
            <div className="bg-white p-3">
              <p className="text-gray-900 capitalize">{caption}</p>
            </div>
          )}
          <div 
            className="h-[400px] relative bg-gray-100"
            style={{
              background: `url(${uploadImage}) center/contain no-repeat`
            }}
          />
        </>
      )}

      {hasBackgroundImage && !hasUploadImage && (
        <div 
          className="h-[400px] relative"
          style={{
            background: `url(${background.image}) center/cover no-repeat`
          }}
        >
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl capitalize">
            {caption}
          </p>
        </div>
      )}

{/* Reactions section */}
<div className="flex gap-2 justify-between p-3">
  <p className="text-gray-600 flex gap-1 m-0 relative">
    {Array.from(new Set(likes?.map((like) => like.type)))
      .map((type, index) => {
        const emojiMap = {
          wow: (
            <picture>
              <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62f/512.webp" type="image/webp"/>
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f62f/512.gif" alt="😯" width="24" height="24"/>
            </picture>
          ),
          like: (
            <picture>
              <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44d/512.webp" type="image/webp"/>
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44d/512.gif" alt="👍" width="24" height="24"/>
            </picture>
          ),
          love: (
            <picture>
              <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.webp" type="image/webp"/>
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.gif" alt="❤" width="24" height="24"/>
            </picture>
          ),
          haha: (
            <picture>
              <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f606/512.webp" type="image/webp"/>
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f606/512.gif" alt="😆" width="24" height="24"/>
            </picture>
          ),
          angry: (
            <picture>
              <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.webp" type="image/webp"/>
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.gif" alt="😡" width="24" height="24"/>
            </picture>
          ),
          sad: (
            <picture>
              <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f61f/512.webp" type="image/webp"/>
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f61f/512.gif" alt="😟" width="24" height="24"/>
            </picture>
          )
        };
        
        return (
          <span 
            key={type} 
            className="inline-block"
            style={{
              marginLeft: index > 0 ? '-10px' : '0',
              zIndex: index + 1,
              position: 'relative'
            }}
          >
            {emojiMap[type]}
          </span>
        );
      })
      .filter(Boolean)
    }
    <span className="ml-1">{likes.length}</span>
  </p>
  <p>{comments.length + " "}Comments</p>
</div>

      <hr className="bg-gray-300 h-[1px] border-0" />

      <div className="flex justify-between items-center p-3">
        <div className="flex gap-2 justify-center items-center w-full cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <EmojiReactions post_id={_id} likes={likes || null} />
          
        </div>
        <div className="flex gap-2 justify-center items-center w-full cursor-pointer hover:bg-gray-100 p-2 rounded-md">
         <CommentModel  post_id={_id}/>
        </div>
        <div className="flex gap-2 justify-center items-center w-full cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <PiShareFat className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600">Share</h6>
        </div> 
      </div>
    </div>
  );
};

export default GetPosts;