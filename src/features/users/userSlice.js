import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, verifyUser } from './userService';

export const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    userError: false,
    userSuccess: false,
    userLoading: false,
    userMessage: '',
};

export const registerUserAsync = createAsyncThunk(
    'user/registerUser',
    async (userData, thunkAPI) => {
        try {
            return await registerUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async (userData, thunkAPI) => {
        try {
            return await loginUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const verifyUserAsync = createAsyncThunk(
    'user/verifyUser',
    async (otpData, thunkAPI) => {
        try {
            return await verifyUser(otpData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Create slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.userError = false;
            state.userSuccess = false;
            state.userLoading = false;
            state.userMessage = '';
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            // Register cases
            .addCase(registerUserAsync.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(registerUserAsync.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userSuccess = true;
                state.user = action.payload;
                state.userMessage = 'Registration successful!';
            })
            .addCase(registerUserAsync.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = true;
                state.userMessage = action.payload;
            })
            
            // Login cases
            .addCase(loginUserAsync.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userSuccess = true;
                state.user = action.payload;
                state.userMessage = 'Login successful!';
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = true;
                state.userMessage = action.payload;
            })
            
            // Verify cases
            .addCase(verifyUserAsync.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(verifyUserAsync.fulfilled, (state, action) => {
                state.userLoading = false;
                state.userSuccess = true;
                state.user = action.payload;
                state.userMessage = 'Verification successful!';
            })
            .addCase(verifyUserAsync.rejected, (state, action) => {
                state.userLoading = false;
                state.userError = true;
                state.userMessage = action.payload;
            });
    }
});

export default userSlice.reducer;
export const { resetUser, logoutUser } = userSlice.actions;