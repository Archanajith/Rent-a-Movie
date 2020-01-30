const mongoose = require('mongoose');

const movieGenreSchema = mongoose.Schema({
                                             genre: {
                                                 type: mongoose.Schema.Types.ObjectId,
                                                 ref: 'GenreModel'
                                             },
                                             movies: {
                                                 type: mongoose.Schema.Types.ObjectId,
                                                 ref: 'MoviesModel'
                                             },
                                         }, {collection: 'moviegenre'});
module.exports = movieGenreSchema;