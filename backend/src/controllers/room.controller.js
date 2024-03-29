const asyncHandler = require('express-async-handler');

const { roomService } = require('../services/');

const createRoom = asyncHandler(async (req, res) => {
  const { roomName } = req.body;

  const room = await roomService.createRoom(roomName);

  res.status(201).json({
    isSuccess: true,
    message: 'Room created successfully',
    data: room,
  });
});

const getRooms = asyncHandler(async (req, res) => {
  const rooms = await roomService.getRooms();
  res.status(200).json({ isSuccess: true, message: '', data: rooms });
});

module.exports = {
  createRoom,
  getRooms,
};
