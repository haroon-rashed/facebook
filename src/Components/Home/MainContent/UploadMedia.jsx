import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const UploadMedia = ({ setMedia, mediaSelected, setMediaSelected, img, setImg, imagePreview, setImagePreview }) => {


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setMediaSelected(true);
    setImg(file)
    setImagePreview(imageUrl);
  };

  return (
    <div className='p-1'>
      <input
        onChange={handleImageChange}
        type='file'
        name='image'
        id='image'
        className='hidden'
      />
      <label htmlFor='image'>
        <div className='max-w-md mx-auto mt-2'>
          {mediaSelected ? (
            <div className='h-[200px] overflow-y-auto rounded-md relative border border-blue-400'>
              <button
                onClick={() => {
                  setMedia(false)
                  setImagePreview(null)
                  setMediaSelected(false)
                }}
                type='button'
                className='absolute top-3 right-3 bg-white rounded-full p-2 shadow-md z-10'
              >
                <FaTimes className='text-gray-600' />
              </button>
              <img
                src={imagePreview}
                alt='Preview'
                className='w-full object-cover'
              />
            </div>
          ) : (
            <div className='bg-gray-100 h-[180px] rounded-md relative border border-blue-400 p-6'>
              <button
                type='button'
                onClick={() => setMedia(false)}
                className='absolute top-3 right-3 bg-white rounded-full p-2 shadow-md'
              >
                <FaTimes className='text-gray-600' />
              </button>

              <div className='flex flex-col justify-center items-center text-center h-40'>
                <div className='bg-gray-300 p-3 rounded-full mb-3'>
                  <FaPlus className='text-xl text-gray-700' />
                </div>
                <h2 className='font-semibold text-lg'>Add photos/videos</h2>
                <p className='text-sm text-gray-500'>or drag and drop</p>
              </div>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default UploadMedia;
