const mongoose = require('mongoose');
const mongodb = require('mongodb');
const db = require('./db');
db();
const genreModel = require('../models/genre.model.server');

getAllGenres = () => {
    return genreModel.find({})
};

addGenre = (genreIp) => {
    let genres = new genreModel({
                                    genre: genreIp
                                });
    return genreModel.create(genres);
};

module.exports =
    {addGenre, getAllGenres};