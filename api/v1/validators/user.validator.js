const BadRequest = require('../../../helpers/APIError.js').BadRequest;

function createUser(req, res, next) {
    req.checkBody({
        name: {
            notEmpty: true,
            errorMessage: 'Invalid Name'
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
    createUser
};
