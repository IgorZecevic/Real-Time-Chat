import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  initiateSocketConnection,
  disconnectSocket,
  getSocket,
} from '../sockets/socket';
import { ADD_MESSAGE } from '../redux/features/chat/chat.slice';

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

      socket.on('onlineUsers', setOnlineUsers);

      socket.on('userJoined', ({ username }) => {
        dispatch(
          ADD_MESSAGE({ senderId: -1, message: `${username} joined the room` })
        );
      });

      socket.on('welcome', () => {
        dispatch(
          ADD_MESSAGE({
            senderId: -1,
            message: 'You have joined the chat room',
          })
        );
      });

      socket.on('userLeft', ({ username }) => {
        dispatch(
          ADD_MESSAGE({ senderId: -1, message: `${username} left the room` })
        );
      });

      return () => disconnectSocket();
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

  return (
    <SocketContext.Provider
      value={{ socket: getSocket(), onlineUsers, joinRoom, leaveRoom }}
    >
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
