
const mongoose = require('mongoose');
const movierolesSchema = require('./movieroles.schema.server');
const movieRolesModel = mongoose.model('MovieRolesModel', movierolesSchema);
module.exports = movieRolesModel;