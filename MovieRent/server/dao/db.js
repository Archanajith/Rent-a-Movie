module.exports = function () {
    const mongoose = require('mongoose');
    const databaseName = 'MovieRental';
    var   connectionString = 'mongodb://localhost:27017/';
    connectionString += databaseName;
    mongoose.connect(connectionString);
};