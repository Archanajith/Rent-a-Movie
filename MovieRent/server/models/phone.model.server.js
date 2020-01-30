const mongoose = require('mongoose');
const phoneSchema = require('./phone.schema.server');
const phoneModel = mongoose.model('PhoneModel', phoneSchema);
module.exports = phoneModel;
