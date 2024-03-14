const User = require('../models/user.model');

const createUser = async (userData) => {
  return User.create(userData);
};

const findUserByUsername = async (username) => {
  return User.findOne({ username: new RegExp(`^${username}$`, 'i') });
};

const findUserById = async (userId) => {
  return User.findById(userId);
};

const findUsers = async () => {
  return User.find().select('-password');
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  findUsers,
};
