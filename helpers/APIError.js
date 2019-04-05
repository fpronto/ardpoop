const httpStatus = require('http-status');
const constants = require('./constants');

class ExtendableError extends Error {
    constructor(message, status, systemCode) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.systemCode = systemCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class APIError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {string} systemCode - System error code.
     */
    constructor(message = 'Server error', status = httpStatus.INTERNAL_SERVER_ERROR, systemCode = constants.SERVER_ERROR) {
        super(message, status, systemCode);
    }
}

class InternalServerError extends APIError {
    /**
     * Creates an API Internal Server Error.
     * @param {string} message - Error message.
     * @param {string} systemCode - System error code.
     */
    constructor(message, systemCode = constants.SERVER_ERROR) {
        super(message, httpStatus.INTERNAL_SERVER_ERROR, systemCode);
    }
}

class NotFound extends APIError {
    /**
     * Creates an API Not Found Error.
     * @param {string} message - Error message.
     */
    constructor(message = 'Element not found') {
        super(message, httpStatus.NOT_FOUND, constants.NOT_FOUND);
    }
}

class Unauthorized extends APIError {
    /**
     * Creates an API Unauthorized Error.
     * @param {string} message - Error message.
     */
    constructor(message = 'Invalid session') {
        super(message, httpStatus.UNAUTHORIZED, constants.UNAUTHORIZED);
    }
}

class Forbidden extends APIError {
    /**
     * Creates an API Forbidden Error.
     * @param {string} message - Error message.
     */
    constructor(message = 'Invliad user prermissions') {
        super(message, httpStatus.FORBIDDEN, constants.FORBIDDEN);
    }
}

class BadRequest extends APIError {
    /**
     * Creates an API Forbidden Error.
     * @param {string} message - Error message.
     */
    constructor(message = 'Invliad fields') {
        super(message, httpStatus.BAD_REQUEST, constants.INVALID_FIELDS);
    }
}

module.exports = {
    APIError,
    InternalServerError,
    NotFound,
    Unauthorized,
    Forbidden,
    BadRequest
};
