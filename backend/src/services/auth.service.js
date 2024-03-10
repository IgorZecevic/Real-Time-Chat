const bcrypt = require('bcrypt');

const { userRepository } = require('../repositories');
const httpErrors = require('../utils/httpErrors');
const validation = require('../utils/validation');
const { generateToken, verifyToken } = require('../utils/jwt');
const handleError = require('../utils/handleError.js');
const redisClient = require('../config/redis');

const register = async ({ username, password, confirmPassword }) => {
  const { isValid, errors, sanitizedData } = validation.validateRegisterData(
    username,
    password,
    confirmPassword
  );

  if (!isValid) {
    throw new httpErrors.BadRequestError('Validation failed', errors);
  }

  const { usernameSanitized } = sanitizedData;

  try {
    await checkIfUsernameIsTaken(usernameSanitized);

    const hashedPassword = await hashUserPassword(password);

    const { user, token } = await createUserAndGenerateToken(
      usernameSanitized,
      hashedPassword
    );

    const userData = {
      _id: user._id,
      username: user.username,
    };

    // Store session info in Redis
    await storeSessionInfoInRedis(userData);

    return { user: userData, token };
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

const login = async ({ username, password }) => {
  const { isValid, errors, sanitizedData } = validation.validateLoginData(
    username,
    password
  );

  if (!isValid) {
    throw new httpErrors.BadRequestError('Validation failed', errors);
  }

  const { usernameSanitized } = sanitizedData;

  try {
    const user = await getUserByCredentials(usernameSanitized, password);

    const token = generateToken(user._id);

    const userData = {
      _id: user._id,
      username: user.username,
    };

    // Store session info in Redis
    await storeSessionInfoInRedis(userData);

    return { user: userData, token };
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

const logout = async (token) => {
  try {
    const decodedData = verifyToken(token);
    if (!decodedData) {
      throw new httpErrors.UnauthorizedError('Not authorized, invalid token');
    }

    await removeSessionInfoFromRedis(decodedData._id);
  } catch (error) {
    console.error(error);
    handleError(error);
  }
};

const loginStatus = async (token) => {
  try {
    const userData = validateToken(token);

    // Check for an active session in Redis before querying the database
    const userSession = await getSessionInfoFromRedis(
      `user_session:${userData._id.toString()}`
    );

    if (userSession && userSession._id) {
      // Update session expiration
      await updateSessionExpiryInRedis(userSession._id);
      return { isLoggedIn: true, user: userSession };
    }

    const user = await userRepository.findUserById(userData._id);
    if (!user) {
      throw new httpErrors.NotFoundError('User not found');
    }

    const newUserData = {
      _id: user._id,
      username: user.username,
    };

    await storeSessionInfoInRedis(newUserData);

    return { isLoggedIn: true, user: newUserData };
  } catch (error) {
    console.error(error);
    handleError(error);
  }
};

const getUserByCredentials = async (username, password) => {
  const user = await userRepository.findUserByUsername(username);
  if (!user) {
    throw new httpErrors.NotFoundError('Invalid credentials');
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new httpErrors.NotFoundError('Invalid credentials');
  }

  return user;
};

const checkIfUsernameIsTaken = async (usernameSanitized) => {
  const existingUser = await userRepository.findUserByUsername(
    usernameSanitized
  );
  if (existingUser) {
    throw new httpErrors.ConflictError(
      'User name is already taken, please try another'
    );
  }
};

const createUserAndGenerateToken = async (
  usernameSanitized,
  hashedPassword
) => {
  const user = await userRepository.createUser({
    username: usernameSanitized,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  return { user, token };
};

const hashUserPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (enteredPassword, userPassword) => {
  return bcrypt.compare(enteredPassword, userPassword);
};

const validateToken = (token) => {
  if (!token) {
    throw new httpErrors.UnauthorizedError('Please log in to continue');
  }

  const userData = verifyToken(token);
  if (!userData) {
    throw new httpErrors.UnauthorizedError('Please log in to continue');
  }

  return userData;
};

const storeSessionInfoInRedis = async (userData) => {
  try {
    await redisClient.set(
      `user_session:${userData._id.toString()}`,
      JSON.stringify(userData),
      'EX',
      3600 // 1 hour
    );
  } catch (error) {
    console.error(`Store session to Redis:`, error);
  }
};

const getSessionInfoFromRedis = async (key) => {
  try {
    const sessionInfo = await redisClient.get(key);
    if (!sessionInfo) {
      return null;
    }

    return JSON.parse(sessionInfo);
  } catch (error) {
    console.error(`Get session from Redis:`, error);
  }
};

const updateSessionExpiryInRedis = async (userId) => {
  try {
    // Update session expiration
    await redisClient.expire(
      `user_session:${userId.toString()}`,
      3600 //TODO: Move to env variable with user_session
    );
  } catch (error) {
    console.error(`Update session expiry in Redis:`, error);
  }
};

const removeSessionInfoFromRedis = async (userId) => {
  try {
    await redisClient.del(`user_session:${userId.toString()}`);
  } catch (error) {
    console.error(`Remove session from Redis:`, error);
  }
};

module.exports = {
  register,
  login,
  logout,
  loginStatus,
};
