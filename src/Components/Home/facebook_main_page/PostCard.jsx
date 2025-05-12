// PostCard.jsx
import React from "react";
import { FaGlobe, FaRegComment, FaThumbsUp, FaUser } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { PiShareFat } from "react-icons/pi";
import moment from "moment";

const PostCard = ({ background = {}, caption, _id, user_id, createdAt }) => {
  const isDefaultBackground =
    (!background.image && background.startColor === "#ffffff") ||
    (!background.image && background.startColor === "white");

  const showCaptionOnTop = !background.image && isDefaultBackground;

  return (
    <div className="shadow-lg xl:w-[80%] mx-auto lg:w-[80%] md:w-[90%] w-[95%] bg-white rounded-md my-2">
      {/* Header */}
      <div className="flex p-3 justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-[45px] h-[45px] bg-gray-200 border-gray-300 rounded-full border flex justify-center items-center">
            <FaUser size={25} className="text-gray-600" />
          </div>
          <div>
            <h6 className="font-semibold text-sm">
              {user_id?.f_name ?? "User"} {user_id?.l_name ?? ""}
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

      {/* Caption */}
      {showCaptionOnTop && (
        <p className="text-gray-900 p-3 my-2 capitalize">{caption}</p>
      )}

      {/* Background Image or Gradient */}
      {!showCaptionOnTop && (
        <div
          className="h-[400px] relative"
          style={{
            background: background.image
              ? `url(${background.image})`
              : `linear-gradient(to right, ${background.startColor}, ${background.endColor})`,
            backgroundSize: background.image ? "cover" : "contain",
            backgroundPosition: "center center",
          }}
        >
          <p
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 capitalize ${
              background.image || !isDefaultBackground
                ? "text-white text-4xl"
                : "text-black text-xl"
            }`}
          >
            {caption}
          </p>
        </div>
      )}

      {/* Likes Info */}
      <div className="flex gap-2 p-3">
        <p className="text-gray-600 m-0">You and 14 others</p>
      </div>

      <hr className="bg-gray-300 h-[1px] border-0" />

      {/* Actions */}
      <div className="flex justify-between items-center p-3">
        <div className="flex gap-2 justify-center items-center w-full cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <FiThumbsUp className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600">Like</h6>
        </div>
        <div className="flex gap-2 justify-center items-center w-full cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <FaRegComment className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600">Comment</h6>
        </div>
        <div className="flex gap-2 justify-center items-center w-full cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <PiShareFat className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600">Share</h6>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
