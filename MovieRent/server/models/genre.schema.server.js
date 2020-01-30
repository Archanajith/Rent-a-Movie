const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
                                        genre: {
                                            type: String,
                                            required: true
                                        }
                                    }, {collection: 'genre'});
module.exports = genreSchema;