const {
  markUserAsOnline,
  markUserAsOffline,
  userJoinRoom,
  userLeaveRoom,
  sendMessage,
  showRecentRoomMessages,
  canSendMessage,
} = require('../services/chat.service');
const authSocketMiddleware = require('../middlewares/authSocket.middleware');

const setupSocketHandlers = (io) => {
  io.use(authSocketMiddleware);

  io.on('connection', (socket) => {
    const { userId, username } = socket.handshake.query;

    markUserAsOnline(io, socket, userId);

    socket.on('joinRoom', async ({ roomId }) => {
      userJoinRoom({ socket, username, roomId });
    });

    socket.on('leaveRoom', async ({ roomId }) => {
      userLeaveRoom({ socket, username, roomId });
    });

    socket.on('sendMessage', async ({ message, senderId, roomId }) => {
      const canSend = await canSendMessage({ socket, senderId });
      if (!canSend) return;

      sendMessage({ io, roomId, senderId, message });
    });

    socket.on('requestMessageHistory', async ({ roomId }) => {
      showRecentRoomMessages({ socket, roomId });
    });

    socket.on('disconnect', () => {
      // userLeaveRoom({ socket, username, roomId: null }); All will be handled by markUserAsOffline
      markUserAsOffline(io, socket);
    });
  });
};

module.exports = {
  setupSocketHandlers,
};
