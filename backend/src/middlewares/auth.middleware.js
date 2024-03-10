const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const httpErrors = require('../utils/httpErrors.js');
const { userRepository } = require('../repositories/');

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new httpErrors.UnauthorizedError('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new httpErrors.UnauthorizedError('Not authorized, invalid token');
    }

    // If session data exists in Redis, use it and refresh expiry time

    // If session data does not exist in Redis, retrieve user from DB as a fallback
    const user = await userRepository.findUserById(decoded.id);
    if (!user) {
      throw new httpErrors.UnauthorizedError('Not authorized, user not found');
    }

    const userData = { _id: user._id, username: user.username };

    req.user = userData;

    // Recreate Redis session after fallback to DB

    next();
  } catch (error) {
    throw new httpErrors.UnauthorizedError('Not authorized');
  }
});

module.exports = {
  authenticate,
};
