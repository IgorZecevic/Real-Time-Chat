import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {
  initiateSocketConnection,
  disconnectSocket,
  getSocket,
} from '../sockets/socket';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user) {
      const socket = initiateSocketConnection(user._id);
      socket.on('onlineUsers', setOnlineUsers);
      return () => disconnectSocket();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket: getSocket(), onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
