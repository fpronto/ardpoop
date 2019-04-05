const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const poopSchema = new Schema({
    size: {
        type: Number
    }
});

module.exports = mongoose.model('poop', poopSchema);
