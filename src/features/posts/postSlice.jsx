import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import { addPost } from './postService'; 

const initialState = {
  posts: [],
  postLoading: false,
  postError: false,
  postMessage:'',
  postSuccess: false,
};


export const addPostData = createAsyncThunk("addPost", async(postData, thunkAPI) => {
  try{
    return await addPost(postData);
  }catch(error){
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
})

export const  postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers:{
    resetPost:(state)=>{
      state.postLoading = false;
      state.postError = false;
      state.postMessage = '';
      state.postSuccess = false;
    }
  },
  extraReducers: (builder) =>{
    builder
      .addCase(addPostData.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(addPostData.fulfilled, (state, action) => {
        state.postLoading = false;
        state.postError = false;
        state.postMessage = action.payload
        state.posts.unshift(action.payload);
        state.postSuccess = true;
      })
      .addCase(addPostData.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.postMessage = action.payload;
      });
  }
  }
)

export const { resetPost } = postSlice.actions;
export default postSlice.reducer;

