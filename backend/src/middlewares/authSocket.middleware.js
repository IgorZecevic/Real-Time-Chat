const cookie = require('cookie');

const { verifyToken } = require('../utils/jwt.js');

// TODO: Check can we merge this with the auth.middleware.js as they are very similar
function socketAuthMiddleware(socket, next) {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || '');
    const token = cookies.jwt;

    if (!token) {
      throw new Error('Not authorized, no token');
    }

    const decodedData = verifyToken(token);
    if (!decodedData) {
      throw new new Error('Not authorized, invalid token')();
    }

    socket.user = { _id: decodedData._id };
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
}

module.exports = socketAuthMiddleware;
