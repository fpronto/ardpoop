const User = require('../../../src/models/user.model.js');

const Unauthorized = require('../../../helpers/APIError').Unauthorized;

const authService = require('../../../src/services/auth.service');


function sessionValidation(req, res, next) {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }
    else {
        token = req.body.token || req.query.token || req.headers['x-access-token'];
    }

    if (!token) {
        return next(new Unauthorized('No Token Provided'));
    }


    return authService.decodeJWT(token, (err, decoded) => {
        if (err) {
            return next(new Unauthorized('Invalid Token'));
        }


        return User.findById(decoded._id, '-__v -password', (errUser, user) => {
            if (errUser) {
                return next(new Unauthorized('Invalid Token'));
            }

            if (user === null) {
                return next(new Unauthorized('Invalid Token'));
            }

            if (!user.isActive) {
                return next(new Unauthorized('Account Disabled'));
            }

            req.currentUser = user;

            return next();
        });
    });
}


module.exports = { sessionValidation };
