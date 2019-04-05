const mongoose = require('mongoose');

const UserAdmin = require('../../src/models/userAdmin.model');

const config = require('../../config/config.js');

mongoose.connect(config.database, { useNewUrlParser: true });
const dbConnection = mongoose.connection;

dbConnection.on('error', (err) => {
    console.error(err);
    throw new Error('MongoDB connection error. Please make sure MongoDB is running.');
});
dbConnection.once('open', () => {
    console.log('Connection Successful');

    return initUsers((err) => {
        if (err) {
            console.log(err);
        }
        console.log('==== COMPLETE ====');
        process.exit(1);
    });
});

function initUsers(done) {
    const admin = new UserAdmin();

    admin.email = 'filiperainho@crossing.pt';
    admin.name = 'Filipe Rainho';
    admin.password = 'answers';
    admin.isActive = true;

    return admin.save(done);
}
