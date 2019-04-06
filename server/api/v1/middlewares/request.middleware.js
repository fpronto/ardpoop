const NotFound = require('../../../helpers/APIError').NotFound;
const BadRequest = require('../../../helpers/APIError').BadRequest;
const InternalServerError = require('../../../helpers/APIError').InternalServerError;
const utils = require('../../../helpers/utils');
const Poop = require('../../../src/models/poop.model');

function verifySession(req, res, next) {
    const id = req.params.id;
    if (!utils.isMongoId(id)) {
        return next(new BadRequest('Invalid id', 'INVALID_ELEMENT'));
    }
    return Poop.findById(id, (err, doc) => {
        if (err) {
            return next(new InternalServerError(err.messsage, 'FIDING_ELEMENT'));
        }
        if (!doc) {
            return next(new NotFound('sesson not found!', 'FIDING_ELEMENT'));
        }
        if (doc.lock) {
            return next(new BadRequest('This sesson is already lock', 'LOCK_ELEMENT'));
        }
        req.currentSesson = doc;
        return next();
    });
}

function verifyData(req, res, next) {
    const name = req.body.name;
    if (!name) {
        return next(new BadRequest('name is missing', 'MISSING_ELEMENT'));
    }
    return next();
}
module.exports = {
    verifySession,
    verifyData
};
