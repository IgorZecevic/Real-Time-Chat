const bcrypt = require('bcrypt');

const { userRepository } = require('../repositories');
const httpErrors = require('../utils/httpErrors');
const validation = require('../utils/validation');
const { generateToken, verifyToken } = require('../utils/jwt');
const handleError = require('../utils/handleError.js');

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

    return { user: userData, token };
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

const logout = async (userId) => {
  try {
    // TODO: Implement redis cleanup
  } catch (error) {
    console.error(error);
    handleError(error);
  }
};

const loginStatus = async (token) => {
  try {
    const userData = validateToken(token);

    const user = await userRepository.findUserById(userData._id);
    if (!user) {
      throw new httpErrors.NotFoundError('User not found');
    }

    const newUserData = {
      _id: user._id,
      username: user.username,
    };

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

module.exports = {
  register,
  login,
  logout,
  loginStatus,
};
