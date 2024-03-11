const {
  markUserAsOnline,
  markUserAsOffline,
} = require('../services/chat.service');

const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    markUserAsOnline(io, socket, userId);

    socket.on('disconnect', () => {
      markUserAsOffline(io, socket);
    });
  });
};

module.exports = {
  setupSocketHandlers,
};
