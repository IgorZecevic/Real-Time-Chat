const Message = require('../models/message.model.js');

const createMessage = async (messageData) => {
  const message = await Message.create(messageData);
  await message.populate('senderId');
  return message;
};

const findMessagesByRoomId = async (roomId) => {
  return Message.find({ roomId }).sort({ createdAt: 1 }).populate('senderId');
};

module.exports = {
  createMessage,
  findMessagesByRoomId,
};
