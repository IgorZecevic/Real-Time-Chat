const express = require('express');
const cookieParser = require('cookie-parser');

const apiRouter = require('./src/routes');
const errorHandler = require('./src/middlewares/error.middleware.js');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

// custom error middleware - must be the last thing in the middleware stack
app.use(errorHandler);

module.exports = app;
