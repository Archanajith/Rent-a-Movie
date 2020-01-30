const mongoose = require('mongoose');
const moviesGenreSchema = require('./moviegenre.schema.server');
const MoviesGenreModel = mongoose.model('moviesGenreModel', moviesGenreSchema);
module.exports = MoviesGenreModel;