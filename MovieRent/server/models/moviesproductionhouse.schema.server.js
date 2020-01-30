const mongoose = require('mongoose');

const movieProductionHouseSchema = mongoose.Schema({
                                                       productionHouse: {
                                                           type: mongoose.Schema.Types.ObjectId,
                                                           ref: 'ProductionHouseModel'
                                                       },
                                                       movie: {
                                                           type: mongoose.Schema.Types.ObjectId,
                                                           ref: 'MoviesModel'
                                                       },
                                                   }, {collection: 'movieproductionhouse'});
module.exports = movieProductionHouseSchema;