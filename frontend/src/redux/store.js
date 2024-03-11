import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth/auth.slice';
import roomReducer from './features/room/room.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
  },
});
