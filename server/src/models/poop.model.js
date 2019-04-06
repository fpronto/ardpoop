const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const poopSchema = new Schema({
    user: {
        type: String
    },
    smellLevels: [{
        type: Number
    }]
});

module.exports = mongoose.model('poop', poopSchema);
