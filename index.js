const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const fs = require('fs');

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

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(mongoSanitize());
app.use(expressValidator());
app.use(morgan(config.envType !== 'production' ? 'dev' : 'common'));
app.use(helmet());

app.use(cors({
    origin: [],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/v1', routes);

app.use(error.notFound);
app.use(error.handler);

app.set('port', config.port);

const server = app.listen(app.get('port'), () => {
    console.log('Sever listen on port ' + server.address().port);
});
