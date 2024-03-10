const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'real-time-chat' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, {
    error: err,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Determine the status code
  const statusCode = err.statusCode || 500;

  // Prepare the error response
  const errorResponse = {
    isSuccess: false,
    message: err.message || 'An unexpected error occurred',
    errors: err.errors, // Include structured validation errors if they exist
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  };

  // Remove undefined fields from the response
  Object.keys(errorResponse).forEach(
    (key) => errorResponse[key] === undefined && delete errorResponse[key]
  );

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
