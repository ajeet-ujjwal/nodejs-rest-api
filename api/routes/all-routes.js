const { check } = require('express-validator');
const express = require('express');
const usersController = require('../controllers/user-controller');
const movieController = require('../controllers/movie-controller');
const auth = require('../middleware/auth');

const router = express.Router();

// VALIDATORS
const registrationValidator = [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
]

const loginValidator = [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
]

const movieValidator = [
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('genre').not().isEmpty(),
    check('release_date').not().isEmpty(),
]


// ROUTES FOR USER
router.post('/register', [registrationValidator], usersController.register)
router.post('/login', [loginValidator], usersController.login)

// ROUTES FOR MOVIES	
router.post('/movies', [auth.isLoggedIn, movieValidator], movieController.createMovie);
router.get('/movies', [auth.isLoggedIn], movieController.getMovies);
router.get('/movies/:id', [auth.isLoggedIn], movieController.getMovieById);
router.get('/favourites', [auth.isLoggedIn], movieController.getFavouriteMovies);
router.post('/favourite/:id', [auth.isLoggedIn], movieController.setFavouriteMovie);

module.exports = router;