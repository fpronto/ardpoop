const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    users: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        isOwner: {
            type: Boolean,
            default: false
        }
    }],
    name: {
        type: String,
        required: true
    },
    legalName: {
        type: String,
        required: true
    },
    responsibleName: {
        type: String,
        required: true
    },
    vat: {
        type: String,
        required: true
    },
    businessSector: {
        type: String,
        required: true
    },
    address: {
        fullAddress: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    website: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('User', ClientSchema);
