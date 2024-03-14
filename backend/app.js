const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const apiRouter = require('./src/routes');
const errorHandler = require('./src/middlewares/error.middleware.js');

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

// custom error middleware - must be the last thing in the middleware stack
app.use(errorHandler);

module.exports = app;
