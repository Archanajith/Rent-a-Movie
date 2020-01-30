
const mongoose = require('mongoose');
const productionHouseSchema = require('./productionhouse.schema.server');
const productionHouseModel = mongoose.model('ProductionHouseModel', productionHouseSchema);
module.exports = productionHouseModel;