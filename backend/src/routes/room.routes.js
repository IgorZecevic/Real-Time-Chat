const express = require('express');

const { roomController } = require('../controllers');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();
router.post('/', authenticate, roomController.createRoom);
router.get('/', authenticate, roomController.getRooms);

module.exports = router;
