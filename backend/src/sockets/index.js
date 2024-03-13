const {
  markUserAsOnline,
  markUserAsOffline,
  userJoinRoom,
  userLeaveRoom,
  sendMessage,
} = require('../services/chat.service');

const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    const { userId, username } = socket.handshake.query;

    markUserAsOnline(io, socket, userId);

    socket.on('joinRoom', async ({ roomId }) => {
      userJoinRoom({ socket, userId, username, roomId });
    });

    socket.on('leaveRoom', async ({ roomId }) => {
      userLeaveRoom({ socket, username, roomId });
    });

    socket.on('sendMessage', async ({ message, senderId, roomId }) => {
      sendMessage({ io, roomId, senderId, message });
    });

    socket.on('disconnect', () => {
      userLeaveRoom({ socket, username, roomId: null });
      markUserAsOffline(io, socket);
    });
  });
};

module.exports = {
  setupSocketHandlers,
};
