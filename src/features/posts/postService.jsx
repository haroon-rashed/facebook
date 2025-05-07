import axios from 'axios';

const API_URL = 'http://localhost:5180/api/posts/';
export const addPost = async (postData) =>{
 const response = await axios.post(`${API_URL}add_post/${postData?.user_id}`, postData, {
  headers: {
    'Content-Type': 'application/json'
  }
});

  return response.data;
}