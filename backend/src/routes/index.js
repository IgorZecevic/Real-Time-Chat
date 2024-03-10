const express = require('express');

const authRouter = require('./auth.routes');
const roomRouter = require('./room.routes');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/rooms', roomRouter);

module.exports = apiRouter;
