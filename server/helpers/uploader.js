const multer = require('multer');
const config = require('../config/config.js');
const utils = require('./utils.js');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, config.uploadDir);
    },
    filename: (req, file, callback) => {
        const fileNameSplited = file.originalname.split('.');
        callback(null, utils.generateFileName(fileNameSplited[fileNameSplited.length - 1]));
    }
});

function uploadFile() {
    return multer({
        storage,
        fileFilter: (req, file, callback) => {
            if (!utils.isImage(file.originalname)) {
                return callback(new Error('Only image files allow'));
            }
            return callback(null, true);
        },
        limits: {
            fileSize: utils.getFileSize(1)
        }
    });
}

module.exports = {
    uploadFile
};
