
const mongoose = require('mongoose');
const couponsAvailableSchema = require('./couponsavailable.schema.server');
const couponsAvailableModel = mongoose.model('CouponsAvailableModel', couponsAvailableSchema);
module.exports = couponsAvailableModel;