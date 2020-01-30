const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema({
                                         name: {
                                             type: String,
                                             required: true
                                         },
                                         description: {
                                             type: String,
                                             required: true
                                         },
                                         director: {
                                             type: String,
                                             required: true
                                         },
                                         actors: {
                                             type: String,
                                             required: true
                                         },
                                         year: Number,
                                         rating: Number
                                     }, {collection: 'movies'});
module.exports = moviesSchema;
