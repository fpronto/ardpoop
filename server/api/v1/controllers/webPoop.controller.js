const APISuccess = require('../../../helpers/APISuccess');
const poopService = require('../../../src/services/poop.service');

function top(req, res, next) {
    const response = new APISuccess({});
    return res.status(response.getStatus()).json(response.getResponse());
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

module.exports = {
    top,
    status,
    toxicity
};
