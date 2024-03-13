const express = require('express');

const { userController } = require('../controllers');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();
router.get('/', authenticate, userController.getUsers);

module.exports = router;
