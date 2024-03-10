const express = require('express');

const authRouter = require('./auth.routes');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);

module.exports = apiRouter;
