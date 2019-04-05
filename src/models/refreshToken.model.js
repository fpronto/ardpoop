const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
