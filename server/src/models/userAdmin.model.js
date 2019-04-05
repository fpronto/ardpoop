const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = require('./user.model.js');

const options = { discriminatorKey: 'kind' };

const UserAdminSchema = new Schema({

}, options);

const UserAdmin = User.discriminator('userAdmin', UserAdminSchema);

module.exports = UserAdmin;
