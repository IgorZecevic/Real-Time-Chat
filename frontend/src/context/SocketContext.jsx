import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { initiateSocketConnection, disconnectSocket } from '../sockets/socket';
import {
  handleOnlineUsers,
  handleUserJoined,
  handleWelcome,
  handleUserLeft,
  handleMessage,
  handleMessageHistoryList,
  handleRateLimitExceeded,
} from '../sockets/socketHandlers';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user) {
      const socket = initiateSocketConnection(user);

      setSocket(socket);

      socket.on('onlineUsers', handleOnlineUsers(setOnlineUsers));
      socket.on('userJoined', handleUserJoined(dispatch));
      socket.on('welcome', handleWelcome(dispatch));
      socket.on('userLeft', handleUserLeft(dispatch));
      socket.on('message', handleMessage(dispatch));
      socket.on('messageHistory', handleMessageHistoryList(dispatch));
      socket.on('rateLimitExceeded', handleRateLimitExceeded());

      return () => {
        if (socket) {
          socket.off('onlineUsers', handleOnlineUsers(setOnlineUsers));
          socket.off('userJoined', handleUserJoined(dispatch));
          socket.off('welcome', handleWelcome(dispatch));
          socket.off('userLeft', handleUserLeft(dispatch));
          socket.off('message', handleMessage(dispatch));
          socket.off('messageHistory', handleMessageHistoryList(dispatch));
          socket.off('rateLimitExceeded', handleRateLimitExceeded());
          disconnectSocket();
        }
      };
    }
  }, [user, dispatch]);

  const joinRoom = useCallback(
    (roomId) => {
      if (socket) {
        socket.emit('joinRoom', { roomId });
      }
    },
    [socket]
  );

  const leaveRoom = useCallback(
    (roomId) => {
      if (socket) {
        socket.emit('leaveRoom', { roomId });
      }
    },
    [socket]
  );

  const sendMessage = useCallback(
    ({ message, senderId, roomId }) => {
      if (socket) {
        socket.emit('sendMessage', { message, senderId, roomId });
      }
    },
    [socket]
  );

  const requestMessageHistory = useCallback(
    (roomId) => {
      if (socket) {
        socket.emit('requestMessageHistory', { roomId });
      }
    },
    [socket]
  );

  return (
    <SocketContext.Provider
      value={{
        onlineUsers,
        joinRoom,
        leaveRoom,
        sendMessage,
        requestMessageHistory,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
