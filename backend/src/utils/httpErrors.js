class BaseError extends Error {
  constructor(name, statusCode, message) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends BaseError {
  constructor(message) {
    super('NotFoundError', 404, message);
  }
}

class BadRequestError extends BaseError {
  constructor(message, errors = {}) {
    super('BadRequestError', 400, message);
    this.errors = errors; // Additional property to hold validation errors
  }
}

class UnauthorizedError extends BaseError {
  constructor(message) {
    super('UnauthorizedError', 401, message);
  }
}

class ConflictError extends BaseError {
  constructor(message) {
    super('ConflictError', 409, message);
  }
}

class ServerError extends BaseError {
  constructor(message) {
    super('ServerError', 500, message);
  }
}

const httpErrors = {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  ServerError,
};

module.exports = httpErrors;
