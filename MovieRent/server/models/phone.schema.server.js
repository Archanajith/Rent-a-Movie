const mongoose = require('mongoose');

const phoneSchema = mongoose.Schema({
                                        phone: {
                                            type: String,
                                            required: true
                                        },
                                    }, {collection: 'phone'});
module.exports = phoneSchema;
