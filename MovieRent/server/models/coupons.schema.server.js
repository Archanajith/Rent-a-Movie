const mongoose = require('mongoose');

const couponsSchema = mongoose.Schema({
                                          name: {
                                              type: String,
                                              required: true
                                          },
                                          discount: Number
                                      }, {collection: 'coupons'});
module.exports = couponsSchema;