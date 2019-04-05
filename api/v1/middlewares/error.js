const httpStatus = require('http-status');
const NotFound = require('../../../helpers/APIError.js').NotFound;
const config = require('../../../config/config.js');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
    const response = {
        success: false,
        code: err.status,
        message: err.message,
        systemCode: err.systemCode
    };

    if (config.envType !== 'production') {
        response.stack = err.stack;
    }

    res.status(err.status).json(response);
    res.end();
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
const notFound = (req, res, next) => {
    const err = new NotFound('Not Found', httpStatus.NOT_FOUND, '000');
    return handler(err, req, res);
};

module.exports = {
    handler,
    notFound
};
