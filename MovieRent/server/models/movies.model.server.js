
const mongoose = require('mongoose');
const moviesSchema = require('./movies.schema.server');
const moviesModel = mongoose.model('MoviesModel', moviesSchema);
module.exports = moviesModel;