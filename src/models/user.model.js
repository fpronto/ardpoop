const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


UserSchema.pre('save', function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const rounds = 10;
        const hash = bcrypt.hashSync(this.password, rounds);

        this.password = hash;

        return next();
    }
    catch (err) {
        return next(err);
    }
});

UserSchema.method({
    comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
});

module.exports = mongoose.model('User', UserSchema);
