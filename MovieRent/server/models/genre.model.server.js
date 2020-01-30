
const mongoose = require('mongoose');
const genreSchema = require('./genre.schema.server');
const genreModel = mongoose.model('GenreModel', genreSchema);
module.exports = genreModel;