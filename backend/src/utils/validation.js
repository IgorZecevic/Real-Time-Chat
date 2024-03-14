/**
 * Validates user data for registration
 * @param {string} username - String
 * @param {string} password - String
 * @param {string} confirmPassword - String
 * @returns {Object} - Object that contains the properties isValid, errors and sanitizedData
 */
const validateRegisterData = (username, password, confirmPassword) => {
  const errors = {};

  if (!username || !username.trim()) {
    errors.username = 'Please enter a username';
  }

  if (username && username.length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }

  if (username && username.includes(' ')) {
    errors.username = 'Username cannot contain spaces';
  }

  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  if (password != confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  const isValid = Object.keys(errors).length === 0;

  const result = {
    isValid,
    errors,
  };

  if (isValid) {
    result.sanitizedData = { usernameSanitized: username.trim() };
  }

  return result;
};

/**
 * Validates user data for login
 * @param {String} username - String
 * @param {String} password - String
 * @returns {Object} - Object that contains the properties isValid, errors and sanitizedData
 */
const validateLoginData = (username, password) => {
  const errors = {};

  if (!username || !username.trim()) {
    errors.username = 'Please enter a username';
  }

  if (!password) {
    errors.password = 'Please enter a password';
  }

  const isValid = Object.keys(errors).length === 0;

  const result = {
    isValid,
    errors,
  };

  if (isValid) {
    result.sanitizedData = { usernameSanitized: username.trim() };
  }

  return result;
};

/**
 * Validates room data for creating rooms
 * @param {String} roomName - String
 * @returns {Object} - Object that contains the properties isValid, errors and sanitizedData
 */
const validateCreateRoomData = (roomName) => {
  const errors = {};

  if (!roomName || !roomName.trim()) {
    errors.roomName = 'Please enter a room name';
  }

  const isValid = Object.keys(errors).length === 0;

  const result = {
    isValid,
    errors,
  };

  if (isValid) {
    result.sanitizedData = { roomNameSanitized: roomName.trim() };
  }

  return result;
};

/**
 * Validates message data for creating messages
 * @param {String} message - String
 * @returns {Object} - Object that contains the properties isValid, errors and sanitizedData
 */
const validateCreateMessageData = (message) => {
  const errors = {};

  if (!message || !message.trim()) {
    errors.message = 'Message cannot be empty';
  }

  const isValid = Object.keys(errors).length === 0;

  const result = {
    isValid,
    errors,
  };

  if (isValid) {
    result.sanitizedData = { messageSanitized: message.trim() };
  }

  return result;
};

const validation = {
  validateRegisterData,
  validateLoginData,
  validateCreateRoomData,
  validateCreateMessageData,
};

module.exports = validation;
