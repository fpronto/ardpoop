const BadRequest = require('../../../helpers/APIError.js').BadRequest;

function signin(req, res, next) {
    req.checkBody({
        email: {
            notEmpty: true,
            isEmail: true,
            errorMessage: 'Invalid Email'
        },
        password: {
            notEmpty: true,
            errorMessage: 'Invalid Password'
        }
    });

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return next(new BadRequest(result.mapped()));
        }

        return next();
    });
}

function refreshToken(req, res, next) {
    req.checkBody({
        email: {
            notEmpty: true,
            isEmail: true,
            errorMessage: 'Invalid Email'
        },
        refreshToken: {
            notEmpty: true,
            errorMessage: 'Invalid RefreshToken'
        }
    });

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return next(new BadRequest(result.mapped()));
        }

        return next();
    });
}

function revokeRefreshToken(req, res, next) {
    req.checkBody({
        refreshToken: {
            notEmpty: true,
            errorMessage: 'Invalid RefreshToken'
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
    signin,
    refreshToken,
    revokeRefreshToken
};
