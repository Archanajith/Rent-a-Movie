const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
                                           availableBalance: Number,
                                           isGoldClass: Boolean
                                       }, {collection: 'customer'});
module.exports = customerSchema;