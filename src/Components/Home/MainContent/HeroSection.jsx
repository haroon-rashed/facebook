import React, { useEffect } from 'react'
import AddPost from './Post/AddPost'
// import GetPosts from '../facebook_main_page/GetPosts'
import Stories from './stories/Stories'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsData } from '../../../features/posts/postSlice'
import PostsContainer from '../facebook_main_page/PostsContainer'

const HeroSection = () => {
  const dispatch = useDispatch();
  const { postError, postSuccess, posts, postMessage, postLoading } = useSelector((state) => state.posts)

useEffect(() => {
  dispatch(getPostsData());
}, [dispatch]); 


  return (
    <div className='h-[85vh] scrollbar-hidden overflow-y-scroll'>
      <AddPost />
      <Stories />
      {/* {posts?.map((item, index) => (
        <GetPosts {...item} key={index} />
      ))} */}
      <PostsContainer/>
    </div>
  );
}

export default HeroSection;
