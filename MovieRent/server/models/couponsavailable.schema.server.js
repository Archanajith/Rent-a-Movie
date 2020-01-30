const mongoose = require('mongoose');

const couponsavailableSchema = mongoose.Schema({
                                          count: Number,
                                          customer:{
                                              type: mongoose.Schema.Types.ObjectId,
                                              ref: 'UserModel'
                                          },
                                          coupon: {
                                              type: mongoose.Schema.Types.ObjectId,
                                              ref: 'CouponsModel'
                                          }
                                      }, {collection: 'couponsavailable'});
module.exports = couponsavailableSchema;