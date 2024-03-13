import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/auth.slice';
import roomReducer from './features/room/room.slice';
import userReducer from './features/user/user.slice';
import chatReducer from './features/chat/chat.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    user: userReducer,
    chat: chatReducer,
  },
});
