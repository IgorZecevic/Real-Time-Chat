const express = require('express');

const {
  register,
  login,
  logout,
  loginStatus,
} = require('../controllers/auth.controller.js');

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/login-status', loginStatus);

module.exports = router;
