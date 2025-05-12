import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addPost, getAllPosts, makeReaction } from './postService';

const initialState = {
  posts: [],
  postLoading: false,
  postError: null,
  postMessage: '',
  postSuccess: false,
  reactionLoading: false,
  reactionError: false,
  reactionSuccess: false,
};

export const addPostData = createAsyncThunk(
  "posts/addPost",
  async (postData, thunkAPI) => {
    try {
      return await addPost(postData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message || "Failed to add post"
      );
    }
  }
);

export const getPostsData = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      return await getAllPosts();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message || "Failed to load posts"
      );
    }
  }
);

export const addReactionData = createAsyncThunk(
  "reaction-data", 
  async (reactionData, thunkAPI) => {
    try {
      return await makeReaction(reactionData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message || "Failed to add reaction"
      );
    }
  }
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPost: (state) => {
      state.postLoading = false;
      state.postError = null;
      state.postMessage = '';
      state.postSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPostData.pending, (state) => {
        state.postLoading = true;
        state.postError = null;
      })
      .addCase(addPostData.fulfilled, (state, action) => {
        state.postLoading = false;
        state.postSuccess = true;
        state.posts.unshift(action.payload);
      })
      .addCase(addPostData.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = action.payload;
      })
      .addCase(getPostsData.pending, (state) => {
        state.postLoading = true;
        state.postError = null;
      })
      .addCase(getPostsData.fulfilled, (state, action) => {
        state.postLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPostsData.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = action.payload;
      })
      .addCase(addReactionData.pending, (state) => {
        state.reactionLoading = true;
        state.reactionError = false;
      })
      .addCase(addReactionData.rejected, (state, action) => {
        state.reactionError = true;
        state.reactionLoading = false;
        state.postMessage = action.payload;
      })
      .addCase(addReactionData.fulfilled, (state, action) => {
        state.reactionLoading = false;
        state.reactionSuccess = true;
        // Update the specific post with the reaction
        const { postId, reaction } = action.payload;
        const postIndex = state.posts.findIndex(post => post._id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex].reactions = reaction;
        }
      });
  }
});

export const { resetPost } = postSlice.actions;
export default postSlice.reducer;