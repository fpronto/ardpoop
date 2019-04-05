const InternalServerError = require('../../../helpers/APIError').InternalServerError;
const Unauthorized = require('../../../helpers/APIError').Unauthorized;
const NotFound = require('../../../helpers/APIError').NotFound;
const APISuccess = require('../../../helpers/APISuccess');

function poop(req, res, next) {
    const response = new APISuccess({ data: 'pooped' });
    return res.status(response.getStatus()).json(response.getResponse());
}

module.exports = { poop };
