const moment = require('moment');
const Poop = require('../models/poop.model');

let inUSe = false;
let userSmell = [];
let smellySmelly = 0;
let userId = 'shifter';

/**
 * This function closes the door
 * @param {Function} callback - callback function
 */
function close(callback) {
    inUSe = true;
    return callback(null, true);
}

/**
 * This function open the door and saves the "use"
 * @param {Function} callback - callback function
 */
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

/**
 * This function records the actual smell
 * @param {Number} smelly - level of smell
 * @param {Function} callback - callback function
 */
function smell(smelly, callback) {
    smellySmelly = smelly;
    if (inUSe) {
        userSmell.push(smelly);
    }
    return callback(null, true);
}

/**
 * This function records the owner id of the smeell
 * @param {String} smellyUser - id from the smeell owner
 * @param {Function} callback - callback function
 */
function user(smellyUser, callback) {
    userId = smellyUser;
    return callback(null, true);
}

/**
 * This returns the use status of the bathroom
 */
function getStatus() {
    return inUSe;
}

/**
 * This returns the level of Toxicity
 */
function getToxicity() {
    return smellySmelly;
}

/**
 * This returns the top teen of bathroom DESTRUCTIONS
 * @param {Function} callback - callback function
 */
function getTopTen(callback) {
    Poop.find({}, '-v', (err, docs) => {
        if (err) {
            return callback(err);
        }
        let returnDocs = docs.map((v) => {
            const top = Math.max(...v.smellLevels).toFixed(2);
            const averageFunc = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

            const average = averageFunc(v.smellLevels).toFixed(2);
            return {
                id: v._id,
                user: v.user,
                top,
                average,
                lock: v.lock,
                date: moment(v.createdAt).format('lll')
            };
        });
        returnDocs = returnDocs.sort((a, b) => {
            return b.top - a.top;
        });
        returnDocs = returnDocs.slice(0, 10);


        return callback(null, returnDocs);
    });
    // return
    // return callback(null, true);
}

function setOwner(options, callback) {
    const sesson = options.sesson;
    const name = options.name;
    sesson.user = name;
    sesson.lock = true;
    return sesson.save((err, sessonSaved) => {
        if (err) {
            return callback(err);
        }
        return callback(null, sessonSaved);
    });
}

module.exports = {
    close,
    open,
    smell,
    user,
    getStatus,
    getToxicity,
    getTopTen,
    setOwner
};
