const { userRepository } = require('../repositories');
const handleError = require('../utils/handleError.js');

const getUsers = async () => {
  try {
    users = await userRepository.findUsers();
    return users;
  } catch (error) {
    console.error(error);
    handleError(error);
  }
};

module.exports = {
  getUsers,
};
