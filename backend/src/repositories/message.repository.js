const Message = require('../models/message.model.js');

const findMessagesByRoomId = async (roomId) => {
  return Message.find({ roomId }).sort({ createdAt: 1 }).populate('senderId');
};

module.exports = {
  findMessagesByRoomId,
};
