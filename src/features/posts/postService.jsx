import axios from 'axios';

const API_URL = 'http://localhost:5180/api/posts/';

export const addPost = async (postData) => {
  if (!postData?.user_id) {
    throw new Error("User ID is missing from postData.");
  }

  const response = await axios.post(`${API_URL}add_post/${postData.user_id}`, postData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}get-all-posts`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};



export const makeReaction = async (reactionData) =>{
  try{
    const response = await axios.post(`${API_URL}add-reaction/${reactionData?.post_id}/${reactionData?.user_id}`, reactionData, )
    return response.data
  }catch(error){
     throw new Error(error.response?.data.message  || 'Failed to create reactions')
  }
}