const Room = require('../models/room.model.js');

const createRoom = async (roomData) => {
  return Room.create(roomData);
};

const findRoomByName = async (name) => {
  return Room.findOne({ name });
};

const findRooms = async () => {
  return Room.find();
};

module.exports = {
  createRoom,
  findRoomByName,
  findRooms,
};
