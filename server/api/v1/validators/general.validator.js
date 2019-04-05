const BadRequest = require('../../../helpers/APIError').BadRequest;

function byId(req, res, next) {
    req.checkParams({
        id: {
            notEmpty: true,
            errorMessage: 'Invalid Id'
        }
    });

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return next(new BadRequest(result.mapped()));
        }

        return next();
    });
}

module.exports = {
    byId
};
