const InternalServerError = require('../../../helpers/APIError').InternalServerError;
const Unauthorized = require('../../../helpers/APIError').Unauthorized;
const NotFound = require('../../../helpers/APIError').NotFound;
const APISuccess = require('../../../helpers/APISuccess');
const userService = require('../../../src/services/user.service');
const authService = require('../../../src/services/auth.service');

function signin(req, res, next) {
    return userService.getByEmail(req.body.email, (err, user) => {
        if (err) {
            return next(new InternalServerError('Error find user', 'FIND_ELEMENT'));
        }

        if (!user) {
            return next(new NotFound('User doesn\'t exist or password\'s wrong'));
        }

        if (!user.isActive) {
            return next(new Unauthorized('Account disabled'));
        }

        if (!user.comparePassword(req.body.password)) {
            return next(new NotFound('User doesn\'t exist or password\'s wrong'));
        }

        const token = authService.generateJWT({ _id: user._id, type: user.kind });

        return authService.generateRefreshToken({ _id: user._id, email: user.email }, (errRefresh, refreshTokenObj) => {
            if (errRefresh) {
                return next(new InternalServerError('Error find user', 'FIND_ELEMENT'));
            }

            const reqBody = {
                token,
                refreshToken: refreshTokenObj.token,
                email: refreshTokenObj.userEmail,
                expires: refreshTokenObj.expires
            };

            const response = new APISuccess(reqBody);
            return res.status(response.getStatus()).json(response.getResponse());
        });
    });
}

function refreshToken(req, res, next) {
    const reqData = { token: req.body.refreshToken, email: req.body.email };
    return authService.validateRefreshToken(reqData, (err, result) => {
        if (err) {
            return next(new InternalServerError('Error find refresh token', 'FIND_ELEMENT'));
        }

        if (!result) {
            return next(new Unauthorized('Invalid Refresh Token'));
        }

        return userService.getByEmail(req.body.email, (errUser, user) => {
            if (errUser) {
                return next(new InternalServerError('Error find user', 'FIND_ELEMENT'));
            }

            if (!user) {
                return next(new NotFound('User doesn\'t exist or password\'s wrong'));
            }

            if (!user.isActive) {
                return next(new Unauthorized('Account disabled'));
            }

            const token = authService.generateJWT({ _id: user._id, type: user.kind });

            const response = new APISuccess({ token });
            return res.status(response.getStatus()).json(response.getResponse());
        });
    });
}

function revokeRefreshToken(req, res, next) {
    return authService.revokeRefreshToken(req.body.refreshToken, (err) => {
        if (err) {
            return next(new InternalServerError('Error delete refresh token', 'DELETE_ELEMENT'));
        }

        const response = new APISuccess({});
        return res.status(response.getStatus()).json(response.getResponse());
    });
}

module.exports = { signin, refreshToken, revokeRefreshToken };
