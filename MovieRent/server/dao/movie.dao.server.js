const movieModel = require('../models/movies.model.server');
const genreModel = require('../models/genre.model.server');
const productionHouseModel = require('../models/productionhouse.model.server');
const movieProductionModel = require('../models/moviesproductionhouse.model.server');
const movieGenreModel = require('../models/moviegenre.model.server');
const mongodb = require('mongodb');

/* Get all the movies*/
getAllMovies = () => {
    movieModel.find({}).then((result) => {
        return result;
    }).catch(() => {
        alert("error occurred");
    });
};

getMoviesByTitle = (name) => {
    movieModel.find({name: name}).then((result) => {
        return result;
    }).catch(() => {
        alert("error occurred");
    });
};

async function getGenre(genreName) {
    let genre = await genreModel.findOne({genre: genreName});
    return genre;
}

async function getProductionHouse(productionHouseName) {
    let productionHouse = await productionHouseModel.findOne({name: productionHouseName});
    return productionHouse;
}

//add code here to create the movie object

async function addMovie(name, description, actors, director, year, rating, production_house,
                        genre, genre2) {
    let movies = new movieModel({
                                    name: name,
                                    description: description,
                                    actors: actors,
                                    director: director,
                                    year: year,
                                    rating: rating
                                });
    let fetchedMovie = await movieModel.create(movies);

    let prodHouse = await getProductionHouse(production_house);
    let genres = await getGenre(genre);
    let genres2 = await getGenre(genre2);
    let movieProduction = new movieProductionModel({
                                                       productionHouse: prodHouse._id,
                                                       movie: fetchedMovie._id
                                                   });
    movieProductionModel.create(movieProduction);
    console.log('Genres- ' + genres);
    let movieGenre = new movieGenreModel({
                                             genre: genres._id,
                                             movies: fetchedMovie._id
                                         });
    let movieGenre2 = new movieGenreModel({
                                              genre: genres2._id,
                                              movies: fetchedMovie._id
                                          });
    await movieGenreModel.create(movieGenre);
    await movieGenreModel.create(movieGenre2);
    return fetchedMovie;

}

updateMovie = (movieId, movie_name, actors) => {
    return movieModel.update({_id: new mongodb.ObjectId(movieId)}, {
        $set: {
            actors: actors,
            name: movie_name
        }
    });
};

removeMovie = (id) => {
    movieModel.deleteOne({_id: new mongodb.ObjectId(id)});
};

getMoviesbyId = (id) => {
    return movieModel.find({_id: new mongodb.ObjectId(id)})
};

getMoviesBySearchKey = (data) => {
    return movieModel.find({"name": new RegExp(data)})
};

async function getMoviesByProductionHouse(productionHouseName) {
    let prodHouse = await productionHouseModel.findOne({"name": productionHouseName});
    console.log('House- ' + prodHouse);
    let movieProdHouse = await movieProductionModel.find({"productionHouse": prodHouse._id});
    console.log('prodHouse- ' + movieProdHouse);
    let movieIds = movieProdHouse.map(e => {
        return e.movie;
    });
    let movies = await movieModel.find({"_id": {$in: movieIds}});
    return movies;
}

module.exports =
    {
        getAllMovies,
        addMovie,
        removeMovie,
        updateMovie,
        getMoviesByTitle,
        getMoviesbyId,
        getMoviesBySearchKey,
        getMoviesByProductionHouse
    };
