const httpStatus = require('http-status');
const constants = require('../../../helpers/constants');
const APISuccess = require('../../../helpers/APISuccess.js');
const InternalServerError = require('../../../helpers/APIError.js').InternalServerError;

function create(req, res, next) {
    // create a new user
}

function update(req, res, next) {
    // update existent user
}

function get(req, res, next) {
    // get a specific user
}

function list(req, res, next) {
    // list all users
}

function remove(req, res, next) {
    // function for remove users
}

function paged(req, res, next) {
    // search and list users with pagination
}

module.exports = {
    create,
    update,
    list,
    get,
    paged,
    remove
};
