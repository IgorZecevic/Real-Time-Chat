import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import * as roomService from '../../../services/room.service';

export const createRoom = createAsyncThunk(
  'rooms/create',
  async (roomData, thunkAPI) => {
    try {
      const response = await roomService.createRoom(roomData);
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

export const getRooms = createAsyncThunk('rooms/get', async (thunkAPI) => {
  try {
    const response = await roomService.getRooms();
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
  rooms: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.fulfilled, (state, action) => {
        // Insert the new room at the beginning of the array
        state.rooms.push(action.payload.data);
        state.isSuccess = action.payload.isSuccess;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.rooms = action.payload.data;
        state.isSuccess = action.payload.isSuccess;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('rooms/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.isSuccess = false;
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload.message;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('rooms/') && action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
        }
      );
  },
});

export default roomSlice.reducer;
