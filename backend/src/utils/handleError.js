const { ServerError } = require('./httpErrors');

const handleError = (error) => {
  if (error.statusCode) {
    throw error;
  } else {
    console.error('Unexpected Error:', error);
    throw new ServerError('An unexpected error occurred');
  }
};

module.exports = handleError;
