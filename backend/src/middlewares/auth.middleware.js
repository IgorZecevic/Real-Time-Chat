const asyncHandler = require('express-async-handler');

const { verifyToken } = require('../utils/jwt.js');
const httpErrors = require('../utils/httpErrors.js');
const { userRepository } = require('../repositories/');
const redisClient = require('../config/redis.js');

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new httpErrors.UnauthorizedError('Not authorized, no token');
  }

  try {
    const decodedData = verifyToken(token);
    if (!decodedData) {
      throw new httpErrors.UnauthorizedError('Not authorized, invalid token');
    }

    // If session data exists in Redis, use it
    const sessionData = await redisClient.get(
      `user_session:${decodedData._id.toString()}`
    );
    if (sessionData) {
      req.user = JSON.parse(sessionData);
      return next();
    }

    // If session data does not exist in Redis, retrieve user from DB as a fallback
    const user = await userRepository.findUserById(decodedData._id);
    if (!user) {
      throw new httpErrors.UnauthorizedError('Not authorized, user not found');
    }

    const userData = { _id: user._id, username: user.username };

    req.user = userData;

    next();
  } catch (error) {
    throw new httpErrors.UnauthorizedError('Not authorized');
  }
});

module.exports = {
  authenticate,
};
