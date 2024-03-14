import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChatId: null,
  messages: [],
  isPrivate: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    SELECT_CHAT: (state, action) => {
      state.messages = [];
      state.selectedChatId = action.payload.chatId;
    },
    SET_HISTORY_MESSAGES: (state, action) => {
      state.messages = [...action.payload, ...state.messages];
    },
    ADD_MESSAGE: (state, action) => {
      state.messages.push(action.payload);
    },
    CLEAR_MESSAGES: (state) => {
      state.messages = [];
    },
  },
});

export const {
  SELECT_CHAT,
  SET_HISTORY_MESSAGES,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
} = chatSlice.actions;

export default chatSlice.reducer;
