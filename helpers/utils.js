const randomstring = require('randomstring');
const path = require('path');
const validator = require('validator');
const mongoose = require('mongoose');
const fs = require('fs');
const config = require('../config/config.js');

function getInvalidFieldObject(field, msg) {
    const obj = {};

    obj[field] = {
        param: field,
        msg
    };

    return obj;
}


function generateFileName(extension) {
    if (!extension) {
        return null;
    }

    const radom = randomstring.generate(5);
    const datetimestamp = Date.now();

    return datetimestamp + radom + '.' + extension;
}

function getFileSize(sizeInMB) {
    return sizeInMB * 1024 * 1024;
}

function isMongoId(id) {
    if (!id) {
        return null;
    }

    return validator.isMongoId(id);
}

function getObjectId(id) {
    if (!id) {
        return null;
    }

    return mongoose.Types.ObjectId(id);
}

function unlinkFile(dir) {
    try {
        fs.unlinkSync(dir);
    }
    catch (e) {
        return new Error('Error unlink file');
    }

    return true;
}

function getFilePath(filename) {
    return config.uploadDir + '/' + filename;
}

function isImage(filename) {
    return path.extname(filename).toLowerCase() === '.jpg' ||
        path.extname(filename).toLowerCase() === '.jpeg' ||
        path.extname(filename).toLowerCase() === '.png';
}

module.exports = {
    getInvalidFieldObject,
    generateFileName,
    getFileSize,
    isMongoId,
    getObjectId,
    unlinkFile,
    getFilePath,
    isImage
};
