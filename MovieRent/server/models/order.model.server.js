
const mongoose = require('mongoose');
const ordersSchema = require('./order.schema.server')
const ordersModel = mongoose.model('OrdersModel', ordersSchema);
module.exports = ordersModel;