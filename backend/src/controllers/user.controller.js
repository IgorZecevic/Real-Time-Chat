const asyncHandler = require('express-async-handler');

const { userService } = require('../services/index.js');

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({ isSuccess: true, message: '', data: users });
});

module.exports = {
  getUsers,
};
