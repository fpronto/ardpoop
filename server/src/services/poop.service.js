const Poop = require('../models/poop.model');

let inUSe = false;
let userSmell = [];
let smellySmelly = 0;
let userId = 'shifter';

function close(callback) {
    inUSe = true;
    return callback(null, true);
}

function open(callback) {
    if (inUSe === true) {
        inUSe = false;
        const poop = new Poop();
        poop.smellLevels = userSmell;
        userSmell = [];
        poop.user = userId;
        userId = 'shifter';
        return poop.save((err, poopSaved) => {
            if (err) {
                return callback(err);
            }
            return callback(null, true);
        });
    }

    return callback(null, false);
}

function smell(smelly, callback) {
    smellySmelly = smelly;
    if (inUSe) {
        userSmell.push(smelly);
    }
    return callback(null, true);
}

function user(smellyUser, callback) {
    userId = smellyUser;
    return callback(null, true);
}

module.exports = {
    close,
    open,
    smell,
    user
};
