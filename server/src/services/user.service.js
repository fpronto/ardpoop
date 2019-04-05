const User = require('../models/user.model.js');

/**
 * create a new user in system.
 * @param {Object []} options - User options.
 * @param {string} options.email - User email, should be unique in the system.
 * @param {string} options.name - User full name.
 * @param {string=} options.password - User password not encrypted (optional).
 * @param {function} callback - Callback function.
 */
function createUser(options, callback) {

}

/**
 * get user information by email
 * @param {string} email - User email.
 * @param {function} callback - Callback function.
 */
function getByEmail(email, callback) {
    const search = {
        email
    };

    return User.findOne(search, '-__v', (err, user) => {
        if (err) {
            return callback(err);
        }

        return callback(null, user);
    });
}

module.exports = {
    createUser,
    getByEmail
};
