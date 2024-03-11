const express = require('express');

const authRouter = require('./auth.routes');
const roomRouter = require('./room.routes');
const userRouter = require('./user.routes');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/rooms', roomRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
