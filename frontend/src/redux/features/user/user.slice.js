import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import * as userService from '../../../services/user.service';

export const getUsers = createAsyncThunk('users/get', async (thunkAPI) => {
  try {
    const response = await userService.getUsers();
    response.message && toast.success(response.message);
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.isSuccess = action.payload.isSuccess;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('users/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload?.message;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('users/') && action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
        }
      );
  },
});

export default userSlice.reducer;
