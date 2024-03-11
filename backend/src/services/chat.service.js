const redisClient = require('../config/redis');

const ONLINE_USERS_KEY = 'onlineUsers';

const markUserAsOnline = async (io, socket, userId) => {
  try {
    await redisClient.sadd(ONLINE_USERS_KEY, userId);
    await redisClient.set(`socket:${socket.id}`, userId);
    emitOnlineUsers(io);
  } catch (error) {
    console.error('Saving online status to Redis failed:', error);
  }
};

const markUserAsOffline = async (io, socket) => {
  try {
    const userId = await redisClient.get(`socket:${socket.id}`);
    if (userId) {
      await redisClient.srem(ONLINE_USERS_KEY, userId);
      await redisClient.del(`socket:${socket.id}`);
      emitOnlineUsers(io);
    }
  } catch (error) {
    console.error('Removing online user status from Redis failed:', error);
  }
};

const emitOnlineUsers = async (io) => {
  try {
    const onlineUsers = await redisClient.smembers(ONLINE_USERS_KEY);
    io.emit('onlineUsers', onlineUsers);
  } catch (error) {
    console.error('Emit online users failed:', error);
  }
};

module.exports = {
  markUserAsOnline,
  markUserAsOffline,
};
