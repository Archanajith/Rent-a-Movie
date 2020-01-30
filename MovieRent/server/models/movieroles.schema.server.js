const mongoose = require('mongoose');
module.exports = mongoose.Schema({
                                     movies: {
                                         type: mongoose.Schema.Types.ObjectId,
                                         ref: 'MoviesModel'
                                     },
                                     roles: {
                                         type: mongoose.Schema.Types.ObjectId,
                                         ref: 'RolesModel'
                                     },
                                     employee: {
                                         type: mongoose.Schema.Types.ObjectId,
                                         ref: 'UserModel'
                                     }
                                 }, {collection: 'movieroles'});