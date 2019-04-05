
const dotEnv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
    dotEnv.config();
}

const envVarsSchema = {
    port: process.env.PORT ? process.env.PORT : 3000,
    secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'node.jsrestapiboilerplatesecretkey',
    database: process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/sample-db',
    uploadDir: process.env.UPLOAD_DIR ? process.env.UPLOAD_DIR : './uploads',
    envType: process.env.ENV_TYPE ? process.env.ENV_TYPE : 'dev'
};

module.exports = envVarsSchema;
