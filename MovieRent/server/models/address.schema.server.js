const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
                                          Street1: {
                                              type: String,
                                              required: true
                                          },
                                          Street2: {
                                              type: String,
                                              required: true
                                          },
                                          City: {
                                              type: String,
                                              required: true
                                          },
                                          State: String,
                                          Zip: {
                                              type: String,
                                              required: true
                                          }
                                      }, {collection: 'address'});
module.exports = addressSchema;
