const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Client = require('./client.model.js');

const options = { discriminatorKey: 'kind' };

const advertiserSchema = new Schema({

}, options);

const advertiser = Client.discriminator('advertiser', advertiserSchema);

module.exports = advertiser;
