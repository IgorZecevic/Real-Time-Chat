import { toast } from 'react-toastify';

import {
  SET_HISTORY_MESSAGES,
  ADD_MESSAGE,
} from '../redux/features/chat/chat.slice';

export const handleOnlineUsers = (setOnlineUsers) => (onlineUsers) => {
  setOnlineUsers(onlineUsers);
};

export const handleUserJoined =
  (dispatch) =>
  ({ username }) => {
    dispatch(
      ADD_MESSAGE({ senderId: -1, message: `${username} joined the room` })
    );
  };

export const handleWelcome = (dispatch) => () => {
  dispatch(
    ADD_MESSAGE({
      senderId: -1,
      message: 'You have joined the chat room',
    })
  );
};

export const handleUserLeft =
  (dispatch) =>
  ({ username }) => {
    dispatch(
      ADD_MESSAGE({ senderId: -1, message: `${username} left the room` })
    );
  };

export const handleMessage = (dispatch) => (newMessage) => {
  dispatch(ADD_MESSAGE(newMessage));
};

export const handleMessageHistoryList = (dispatch) => (messages) => {
  dispatch(SET_HISTORY_MESSAGES(messages));
};

export const handleRateLimitExceeded = () => (message) => {
  toast.error(message);
};
