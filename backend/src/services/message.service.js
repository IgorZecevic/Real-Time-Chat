const { messageRepository } = require('../repositories');
const httpErrors = require('../utils/httpErrors');
const validation = require('../utils/validation');
const handleError = require('../utils/handleError.js');
const redisClient = require('../config/redis');

const createMessage = async ({ roomId, senderId, message }) => {
  const { isValid, errors, sanitizedData } =
    validation.validateCreateMessageData(message);

  if (!isValid) {
    throw new httpErrors.BadRequestError('Validation failed', errors);
  }

  const { messageSanitized } = sanitizedData;

  try {
    const newMessage = await messageRepository.createMessage({
      roomId,
      senderId,
      message: messageSanitized,
    });

    return newMessage;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

module.exports = {
  createMessage,
};
