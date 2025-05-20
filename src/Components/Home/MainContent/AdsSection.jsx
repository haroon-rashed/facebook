import React from "react";
import { FaPlus } from "react-icons/fa";

const AdsSection = () => {
  return (
    <div className="h-full p-4">
      <h1 className=" font-semibold text-[1.2rem]">Sponsored</h1>

      {/* Ads */}
      <div className="h-200px rounded-md w-full flex gap-1 my-4 text-start hover:bg-gray-200 p-2 cursor-pointer">
        <img
          width={100}
          src="https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw="
          alt="Ads"
          loading=""
          className="rounded-md"
        />

        <div className="flex flex-col ">
          <p className="font-semibold ">
            No interuption,just cricket-HBLPSL Live in HD,only on tapmad.
          </p>
          <a className="text-xs">tapmad.com</a>
        </div>
      </div>
      <hr className="my-4 text-gray-300" />

      {/* Chats- */}
      <div className="flex flex-col">
        <h1 className=" font-semibold text-[1.2rem] text-black/90">
          Group chats
        </h1>

        <button className="w-full p-2 mt-2 hover:bg-gray-200 transition-all duration-100 cursor-pointer rounded-lg flex items-center gap-3 ">
          <spam className="flex items-center justify-center w-[35px] h-[35px] bg-gray-300 rounded-full">
            <FaPlus />
          </spam>
          Create a group chat
        </button>
      </div>
    </div>
  );
};

export default AdsSection;
