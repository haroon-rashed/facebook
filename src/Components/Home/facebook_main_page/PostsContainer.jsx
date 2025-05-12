import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GetPosts from './GetPosts';
import { ClockLoader } from 'react-spinners';
import { getPostsData } from '../../../features/posts/postSlice';

const PostsContainer = () => {
  const dispatch = useDispatch();
  const { posts, postLoading, postError } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPostsData());
  }, [dispatch]);

  if (postLoading) return (
    <div className="flex justify-center items-center h-64">
      <ClockLoader size={50} color="#3b82f6" />
    </div>
  );

  if (postError) return (
    <div className="text-red-500 text-center p-4">
      Error loading posts: {postError}
    </div>
  );

  return (
    <div className="space-y-4">
      {posts?.map(post => (
        <GetPosts key={post._id} {...post} />
      ))}
    </div>
  );
};

export default PostsContainer;