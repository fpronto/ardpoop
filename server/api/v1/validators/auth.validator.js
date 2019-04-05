const BadRequest = require('../../../helpers/APIError.js').BadRequest;

function signin(req, res, next) {
    req.checkBody({
        data: {
            notEmpty: true
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
    signin
};
