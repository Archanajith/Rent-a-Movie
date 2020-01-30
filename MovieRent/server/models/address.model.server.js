const mongoose = require('mongoose');
const addressSchema = require('./address.schema.server');
const addressModel = mongoose.model('AddressModel', addressSchema);
module.exports = addressModel;
