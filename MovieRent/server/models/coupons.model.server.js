
const mongoose = require('mongoose');
const couponsSchema = require('./coupons.schema.server');
const couponsModel = mongoose.model('CouponsModel', couponsSchema);
module.exports = couponsModel;