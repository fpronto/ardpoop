const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const config = require('./config/config.js');
const error = require('./api/v1/middlewares/error.js');
const routes = require('./api/v1/routes');

if (!fs.existsSync(config.uploadDir)) {
    fs.mkdirSync(config.uploadDir);
}

mongoose.connect(config.database, { useNewUrlParser: true });
const dbConnection = mongoose.connection;

dbConnection.on('error', (err) => {
    console.error(err);
    throw new Error('MongoDB connection error. Please make sure MongoDB is running.');
});
dbConnection.once('open', () => {
    console.log('Connection Successful');
});

const app = express();

app.use('/', (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    next();
}, express.static(path.join(__dirname, '/public')));

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(mongoSanitize());
app.use(expressValidator());
app.use(morgan(config.envType !== 'production' ? 'dev' : 'common'));
app.use(helmet());

app.use('/api/v1', routes);

app.use(error.notFound);
app.use(error.handler);

app.set('port', config.port);

const server = app.listen(app.get('port'), () => {
    console.log('Sever listen on port ' + server.address().port);
});
