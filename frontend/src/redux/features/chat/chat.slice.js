import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChatId: null,
  messages: [],
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
    ADD_MESSAGE: (state, action) => {
      state.messages.push(action.payload);
    },
    CLEAR_MESSAGES: (state) => {
      state.messages = [];
    },
  },
});

export const { SELECT_CHAT, ADD_MESSAGE, CLEAR_MESSAGES } = chatSlice.actions;

export default chatSlice.reducer;
