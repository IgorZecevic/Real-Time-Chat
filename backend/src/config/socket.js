const http = require('http');
const socketIO = require('socket.io');

let io;

module.exports = {
  init: (app) => {
    const server = http.createServer(app);
    io = socketIO(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    return server;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  },
};
