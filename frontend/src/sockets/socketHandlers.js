import { ADD_MESSAGE } from '../redux/features/chat/chat.slice';

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
