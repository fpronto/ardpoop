const InternalServerError = require('../../../helpers/APIError').InternalServerError;
const Unauthorized = require('../../../helpers/APIError').Unauthorized;
const NotFound = require('../../../helpers/APIError').NotFound;
const BadRequest = require('../../../helpers/APIError').BadRequest;
const APISuccess = require('../../../helpers/APISuccess');
const poopService = require('../../../src/services/poop.service');

function poop(req, res, next) {
    const response = new APISuccess({ data: 'pooped' });
    return res.status(response.getStatus()).json(response.getResponse());
}

function close(req, res, next) {
    return poopService.close((err, result) => {
        if (err) {
            return next(new InternalServerError(err.message, 'RECORDING_ELEMENT'));
        }
        const response = new APISuccess({ result });
        return res.status(response.getStatus()).json(response.getResponse());
    });
}

function open(req, res, next) {
    return poopService.open((err, result) => {
        if (err) {
            return next(new InternalServerError(err.message, 'RECORDING_ELEMENT'));
        }
        const response = new APISuccess({ result });
        return res.status(response.getStatus()).json(response.getResponse());
    });
}

function smell(req, res, next) {
    const smelly = req.query.val;
    if (!smelly) {
        const response = new APISuccess({ result: false });
        return res.status(response.getStatus()).json(response.getResponse());
    }
    return poopService.smell(smelly, (err, result) => {
        if (err) {
            return next(new InternalServerError(err.message, 'RECORDING_ELEMENT'));
        }
        const response = new APISuccess({ result });
        return res.status(response.getStatus()).json(response.getResponse());
    });
}

function user(req, res, next) {
    const smellyUser = req.query.id;
    if (!smellyUser) {
        return next(new BadRequest('Smelly user id not found', 'FIDING_ELEMENT'));
    }
    return poopService.user(smellyUser, (err, result) => {
        if (err) {
            return next(new InternalServerError(err.message, 'RECORDING_ELEMENT'));
        }
        const response = new APISuccess({ result });
        return res.status(response.getStatus()).json(response.getResponse());
    });
}
module.exports = {
    poop,
    close,
    open,
    smell,
    user
};
