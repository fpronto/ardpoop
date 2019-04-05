const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = require('./user.model.js');

const options = { discriminatorKey: 'kind' };

const UserManagerSchema = new Schema({

}, options);

const userManager = User.discriminator('userManager', UserManagerSchema);

module.exports = userManager;
