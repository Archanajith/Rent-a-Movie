const mongoose = require('mongoose');

const productionHouseSchema = mongoose.Schema({
                                                  name: {
                                                      type: String,
                                                      required: true
                                                  },
                                                  established: {
                                                      type: Number,
                                                      required: true
                                                  },
                                              }, {collection: 'productionhouse'});
module.exports = productionHouseSchema;