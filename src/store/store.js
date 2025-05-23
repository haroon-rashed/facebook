import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/users/userSlice';
import postSlice from '../features/posts/postSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postSlice 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});