import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import * as authService from '../../../services/auth.service';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      toast.success(response.message);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      toast.success(response?.data?.message);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await authService.logout();
      toast.success(response?.data?.message);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const checkLoginStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, thunkAPI) => {
    try {
      const response = await authService.checkLoginStatus();
      if (response?.data?.isLoggedIn) {
        return response;
      } else {
        return thunkAPI.rejectWithValue('Please log in to continue');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Could not verify login status'
      );
    }
  }
);

const initialState = {
  user: null,
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
        state.isSuccess = action.payload.isSuccess;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoggedIn = true;
        state.isSuccess = action.payload.isSuccess;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isSuccess = action.payload.isSuccess;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isLoggedIn = action.payload.data.isLoggedIn;
        state.isSuccess = action.payload.isSuccess;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(checkLoginStatus.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload.message;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('auth/') && action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
        }
      );
  },
});

export default authSlice.reducer;
