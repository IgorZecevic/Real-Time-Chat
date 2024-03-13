import io from 'socket.io-client';

let socket;
export const initiateSocketConnection = (user) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  socket = io(BACKEND_URL, {
    query: { userId: user._id, username: user.username },
  });
  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const getSocket = () => socket;
