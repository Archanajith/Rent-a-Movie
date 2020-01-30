const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
                                          item: {
                                              type: mongoose.Schema.Types.ObjectId,
                                              ref: 'MoviesModel'
                                          },
                                          quantity: Number,
                                          orderdate: Date,
                                          returndate: Date,
                                          amount: Number,
                                          coupon: Number,
                                          count: Number,
                                          customer: {
                                              type: mongoose.Schema.Types.ObjectId,
                                              ref: 'UserModel'
                                          }
                                      }, {collection: 'order'});
module.exports = orderSchema;