const { validationResult } = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user-model');
const Movie = require('../models/movie-model');


// CREATE A NEW MOVIE 
const createMovie = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { title, description, genre, release_date } = req.body;
    const movie = new Movie({
        title,
        description,
        genre,
        release_date
    });

    try {
        await movie.save();
        res.status(200).json({
            message: "movie created successfully",
            movie: movie
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// GET MOVIE BY ID 
const getMovieById = async (req, res) => {
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId))
        return res.status(400).json({ error: 'invalid movie id' });
    try {
        const movie = await Movie.findById(movieId);
        if (!movie)
            return res.status(404).json('there is no movie with this id.');
        res.status(200).json(movie)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// FILTER MOVIES OR GET ALL MOVIES
const getMovies = async (req, res) => {
    var search = req.query.search;
    const regex = new RegExp(search, 'i');
    try {
        const movies = await Movie.find({ title: { $regex: regex } });
        return res.status(200).json(movies);
    } catch (err) {
        return res.status(500).json({ message: 'server error' + err });
    }

};

// SET A MOVIE AS FAVOURITE FOR USER
const setFavouriteMovie = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId))
        return res.status(400).json({ error: 'Invalid id' });
    try {
        const movie = await Movie.findById(movieId);
        if (!movie)
            return res.status(404).json('there is no movie with this id.');
        const user = await User.findByIdAndUpdate({ _id: req.user.userId }, 
            { $addToSet: { favourite_movies: movieId } }, { new: true });
        return res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: 'server error ' + err });
    }
};

// GET ALL FAVOURITE MOVIES OF USER
const getFavouriteMovies = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('favourite_movies');
        if (!user)
            return res.status(404).json({ message: 'user not found.' });
        const favourite_movies = user.favourite_movies;
        return res.status(200).json(favourite_movies);
    } catch (err) {
        return res.status(500).json({ message: 'server error' + err });
    }
};



exports.createMovie = createMovie;
exports.getMovieById = getMovieById;
exports.getMovies = getMovies;
exports.setFavouriteMovie = setFavouriteMovie;
exports.getFavouriteMovies = getFavouriteMovies;