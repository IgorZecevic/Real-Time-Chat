const redisClient = require('../config/redis');
const { messageService } = require('./index');

const ONLINE_USERS_KEY = 'onlineUsers';

const markUserAsOnline = async (io, socket, userId) => {
  try {
    await redisClient.sadd(ONLINE_USERS_KEY, userId);
    await redisClient.hmset(
      `socketData:${socket.id}`,
      'userId',
      userId,
      'roomId',
      null
    );
    emitOnlineUsers(io);
  } catch (error) {
    console.error('Saving online status to Redis failed:', error);
  }
};

const markUserAsOffline = async (io, socket) => {
  try {
    const userId = await redisClient.hget(`socketData:${socket.id}`, 'userId');
    if (userId) {
      await redisClient.srem(ONLINE_USERS_KEY, userId);
      await redisClient.del(`socketData:${socket.id}`);
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

const userJoinRoom = async ({ socket, username, roomId }) => {
  try {
    await redisClient.hset(`socketData:${socket.id}`, 'roomId', roomId);

    socket.join(roomId);

    // Notify others in the room that a new user has joined
    socket.to(roomId).emit('userJoined', {
      username,
    });

    // Welcome the user who just joined
    socket.emit('welcome');
  } catch (error) {
    console.error('User joined the room failed:', error);
  }
};

//TODO: Check if user data exists when user leaves the room, changes the room, or disconnects by logging out or by closing the browser
//TODO: Check what will happen if the token and session are expired
const userLeaveRoom = async ({ socket, username, roomId }) => {
  try {
    if (!roomId) {
      roomId = await redisClient.hget(`socketData:${socket.id}`, 'roomId');
    }

    await redisClient.hdel(`socketData:${socket.id}`, 'roomId');

    socket.leave(roomId);
    socket.to(roomId).emit('userLeft', { username });
  } catch (error) {
    console.error('User leave the room failed:', error);
  }
};

const sendMessage = async ({ io, roomId, senderId, message }) => {
  try {
    const newMessage = await messageService.createMessage({
      roomId,
      senderId,
      message,
    });

    io.to(roomId).emit('message', newMessage);
  } catch (error) {
    console.error('Send message to a room failed:', error);
  }
};

const showRecentRoomMessages = async ({ socket, roomId }) => {
  try {
    const messages = await messageService.getMessagesByRoomId(roomId);
    socket.emit('messageHistory', messages);
  } catch (error) {
    console.error('Show room messages history failed:', error);
  }
};

const canSendMessage = async ({ socket, senderId }) => {
  try {
    const limit = 10;
    const key = `msg_count:${senderId}:${new Date().getMinutes()}`;
    const currentCount = (await redisClient.get(key)) || 0;

    if (currentCount >= limit) {
      socket.emit('rateLimitExceeded', 'You have exceeded the message limit.');
      return false;
    }

    await redisClient
      .multi()
      .set(key, parseInt(currentCount) + 1, 'EX', 60)
      .exec();

    return true;
  } catch (error) {
    console.error('Check if user can send message failed:', error);
  }
};

module.exports = {
  markUserAsOnline,
  markUserAsOffline,
  userJoinRoom,
  userLeaveRoom,
  sendMessage,
  showRecentRoomMessages,
  canSendMessage,
};
