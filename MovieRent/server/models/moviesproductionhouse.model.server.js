
const mongoose = require('mongoose');
const moviesProductionHouseSchema = require('./moviesproductionhouse.schema.server');
const MoviesProductionHouseModel = mongoose.model('moviesProductionHouseModel', moviesProductionHouseSchema);
module.exports = MoviesProductionHouseModel;