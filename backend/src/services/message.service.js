const { messageRepository } = require('../repositories');
const httpErrors = require('../utils/httpErrors');
const validation = require('../utils/validation');
const handleError = require('../utils/handleError.js');
const redisClient = require('../config/redis');

const ROOM_MESSAGES_KEY = 'chatMessages:';

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

    await storeLatestRoomMessageToRedis(roomId, newMessage);

    return newMessage;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

const getMessagesByRoomId = async (roomId) => {
  try {
    let messages = await getLatestRoomMessagesFromRedis(roomId);
    if (messages.length > 0) {
      return messages;
    }

    messages = await messageRepository.findMessagesByRoomId(roomId);

    if (messages.length > 0) {
      await storeLatestRoomMessagesToRedis(roomId, messages);
    }

    return messages;
  } catch (error) {
    console.error(error);
    handleError(error);
  }
};

const storeLatestRoomMessageToRedis = async (roomId, message) => {
  try {
    const messageForCache = JSON.stringify({
      ...message.toObject(),
    });

    await redisClient.rpush(`${ROOM_MESSAGES_KEY}${roomId}`, messageForCache);
    await redisClient.ltrim(`${ROOM_MESSAGES_KEY}${roomId}`, -50, -1);
  } catch (error) {
    console.error(`Store latest room message to Redis failed:`, error);
  }
};

const storeLatestRoomMessagesToRedis = async (roomId, messages) => {
  try {
    const key = `${ROOM_MESSAGES_KEY}${roomId}`;
    const pipeline = redisClient.pipeline();

    messages.forEach((message) => {
      const serializedMessage = JSON.stringify(message);
      pipeline.rpush(key, serializedMessage);
    });

    pipeline.ltrim(key, -50, -1);
    await pipeline.exec();
  } catch (error) {
    console.error(`Store latest room messages to Redis failed:`, error);
  }
};

const getLatestRoomMessagesFromRedis = async (roomId) => {
  try {
    const cachedMessages = await redisClient.lrange(
      `${ROOM_MESSAGES_KEY}${roomId}`,
      0,
      -1
    );

    if (cachedMessages.length === 0) {
      return [];
    }

    return cachedMessages.map((message) => JSON.parse(message));
  } catch (error) {
    console.error(`Get latest room messages from Redis failed:`, error);
  }
};

module.exports = {
  createMessage,
  getMessagesByRoomId,
};
