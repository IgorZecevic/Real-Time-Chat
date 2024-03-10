const express = require('express');

const { roomController } = require('../controllers');

const router = express.Router();
router.post('/', roomController.createRoom);
router.get('/', roomController.getRooms);

module.exports = router;
