const APISuccess = require('../../../helpers/APISuccess');
const poopService = require('../../../src/services/poop.service');
const InternalServerError = require('../../../helpers/APIError').InternalServerError;

function top(req, res, next) {
    return poopService.getTopTen((err, docs) => {
        if (err) {
            return next(new InternalServerError(err.message, 'RECORDING_ELEMENT'));
        }
        const response = new APISuccess({ top: docs });
        return res.status(response.getStatus()).json(response.getResponse());
    });
}

function status(req, res, next) {
    const useStatus = poopService.getStatus();
    const response = new APISuccess({ status: useStatus });
    return res.status(response.getStatus()).json(response.getResponse());
}

function toxicity(req, res, next) {
    const toxicityLevel = poopService.getToxicity();
    const response = new APISuccess({ toxicity: toxicityLevel });
    return res.status(response.getStatus()).json(response.getResponse());
}

function setOwner(req, res, next) {
    const options = {};
    options.name = req.body.name;
    options.sesson = req.currentSesson;
    return poopService.setOwner(options, (err, result) => {
        if (err) {
            return next(new InternalServerError(err.message, 'RECORDING_ELEMENT'));
        }
        const response = new APISuccess({ result: true });
        return res.status(response.getStatus()).json(response.getResponse());
    });
}

module.exports = {
    top,
    status,
    toxicity,
    setOwner
};
