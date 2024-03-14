const Room = require('../models/room.model.js');

const createRoom = async (roomData) => {
  return Room.create(roomData);
};

const findRoomByName = async (name) => {
  return Room.findOne({ name });
};

const findPrivateRoomByParticipants = async ({ senderId, receiverId }) => {
  return Room.findOne({
    isPrivate: true,
    $and: [
      { participants: { $in: [senderId] } },
      { participants: { $in: [receiverId] } },
    ],
  });
};

const findRooms = async (criteria) => {
  return Room.find(criteria);
};

module.exports = {
  createRoom,
  findRoomByName,
  findRooms,
  findPrivateRoomByParticipants,
};
