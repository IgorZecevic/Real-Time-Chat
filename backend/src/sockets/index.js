const {
  markUserAsOnline,
  markUserAsOffline,
  userJoinRoom,
  userLeaveRoom,
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

    socket.on('disconnect', () => {
      userLeaveRoom({ socket, username, roomId: null });
      markUserAsOffline(io, socket);
    });
  });
};

module.exports = {
  setupSocketHandlers,
};
