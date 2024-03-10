const express = require('express');

const { authController } = require('../controllers');

const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/login-status', authController.loginStatus);

module.exports = router;
