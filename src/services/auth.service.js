const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

const RefreshToken = require('../models/refreshToken.model.js');

const constants = require('../../helpers/constants');
const config = require('../../config/config.js');


/**
 * generate a new JWT.
 * @param {Object []} options - User options.
 * @param {string} options._id - User MongoId.
 * @param {string} options.type - User type (userAdmin or userManager).
 * @param {string=} [options.expiresIn=30m] - token validity expressed in seconds (optional).
 * @param {function} callback - Callback function.
 */

function generateJWT(options) {
    const payload = {
        _id: options._id,
        type: options.type
    };

    const expiresIn = !options.expiresIn ? constants.JWT_EXPIRATION_INTERVAL : options.expiresIn;

    return jwt.sign(payload, config.secret, {
        expiresIn
    });
}


/**
 * decode an existent JWT.
 * @param {string} token - token to decode.
 * @param {function} callback - Callback function.
 */

function decodeJWT(token, callback) {
    return jwt.verify(token, config.secret, callback);
}

/**
 * generate a new refresh token.
 * @param {Object []} options - User options.
 * @param {string} options._id - User MongoId.
 * @param {string} options.email - User email.
 * @param {function} callback - Callback function.
 */

function generateRefreshToken(options, callback) {
    const userId = options._id;
    const userEmail = options.email;
    const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment().add(30, 'days').toISOString();

    const refreshToken = new RefreshToken();
    refreshToken.user = userId;
    refreshToken.userEmail = userEmail;
    refreshToken.token = token;
    refreshToken.expires = expires;

    return refreshToken.save((err) => {
        if (err) {
            return callback(err);
        }

        return callback(null, refreshToken);
    });
}

/**
 * check if refresh token is valid.
 * @param {Object []} options - User options.
 * @param {string} options.token - Refresh token.
 * @param {string} options.email - User email.
 * @param {function} callback - Callback function.
 */

function validateRefreshToken(options, callback) {
    const search = {
        userEmail: options.email,
        token: options.token
    };

    RefreshToken.findOne(search, '-__v', (err, refreshToken) => {
        if (err) {
            return callback(err);
        }

        if (!refreshToken) {
            return callback(null, false);
        }

        if (moment(refreshToken.expires).isBefore()) {
            return refreshToken.remove(() => {
                return callback(null, false);
            });
        }

        return callback(null, true);
    });
}

/**
 * revoke a existent refresh token.
 * @param {string} token - Refresh token.
 * @param {function} callback - Callback function.
 */

function revokeRefreshToken(token, callback) {
    RefreshToken.remove({ token }, callback);
}

module.exports = { generateJWT, decodeJWT, generateRefreshToken, validateRefreshToken, revokeRefreshToken };
