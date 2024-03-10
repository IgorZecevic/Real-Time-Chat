const { roomRepository } = require('../repositories');
const httpErrors = require('../utils/httpErrors');
const validation = require('../utils/validation');
const handleError = require('../utils/handleError.js');
const redisClient = require('../config/redis');

const createRoom = async (name) => {
  const { isValid, errors, sanitizedData } =
    validation.validateCreateRoomData(name);

  if (!isValid) {
    throw new httpErrors.BadRequestError('Validation failed', errors);
  }

  const { nameSanitized } = sanitizedData;

  try {
    await checkIfRoomNameIsTaken(nameSanitized);

    const room = await roomRepository.createRoom({ name: nameSanitized });

    await storeRoomToRoomsListInRedis(room);

    return room;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

const getRooms = async () => {
  try {
    let rooms = await getRoomsListFromRedis();
    if (rooms.length > 0) {
      return rooms;
    }

    rooms = await roomRepository.findRooms();

    rooms.forEach(async (room) => {
      await storeRoomToRoomsListInRedis(room);
    });

    return rooms;
  } catch (error) {
    console.error(error);
    handleError(error);
  }
};

const checkIfRoomNameIsTaken = async (name) => {
  const existingRoom = await roomRepository.findRoomByName(name);
  if (existingRoom) {
    throw new httpErrors.ConflictError(
      'Name is already taken, please try another'
    );
  }
};

const storeRoomToRoomsListInRedis = async (room) => {
  try {
    await redisClient.rpush('roomsList', JSON.stringify(room));
  } catch (error) {
    console.error(`Store room to rooms list to Redis:`, error);
  }
};

const getRoomsListFromRedis = async () => {
  try {
    const rooms = await redisClient.lrange('roomsList', 0, -1);
    return rooms.map((room) => JSON.parse(room));
  } catch (error) {
    console.error(`Get rooms list from Redis:`, error);
  }
};

module.exports = {
  createRoom,
  getRooms,
};