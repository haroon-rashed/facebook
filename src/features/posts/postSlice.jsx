import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addComment, addPost, getAllPosts, makeReaction } from './postService';

const initialState = {
  posts: [],
  postLoading: false,
  postError: null,
  postMessage: '',
  postSuccess: false,
  reactionLoading: false,
  reactionError: false,
  reactionSuccess: false,
  commentLoading: false,
  commentError: false,
  commentSuccess: false,
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



export const addCommentData = createAsyncThunk('add-comment',  async(commentData, thunkAPI)=>{
  try {
    const token = thunkAPI.getState().user.user.token
    console.log(token)
    return await addComment(commentData, token)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error)
  }
})
export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPost: (state) => {
      state.postLoading = false;
      state.postError = null;
      state.postMessage = '';
      state.postSuccess = false;
      state.reactionError = false;
      state.reactionLoading = false;
      state.reactionSuccess = false;
      state.commentError = false;
      state.commentLoading = false;
      state.commentSuccess = false;
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
      })
      .addCase(addCommentData.pending, (state) => {
        state.commentLoading = true;
        state.commentError = false;
      })
      .addCase(addCommentData.rejected, (state, action) => {
        state.commentError = true;
        state.commentLoading = false;
      })
        .addCase(addCommentData.fulfilled, (state, action) => {
          state.commentLoading = false;
          state.commentSuccess = true;
        
          const comments = action.payload.comments;
          const postId = comments[0].post_id; // Get post_id from the first comment
        
          state.posts = state.posts.map(post => {
            if (post._id === postId) {
              return {
                ...post,
                comments: comments
              };
            }
            return post;
          });
        });
        
  }
});

export const { resetPost } = postSlice.actions;
export default postSlice.reducer;