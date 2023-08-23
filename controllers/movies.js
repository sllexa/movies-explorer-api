const errMongo = require('mongoose').Error;
const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const {
  CREATE_CODE_SUCCESS, WRONG_DATA_MOVIE, MOVIE_NOT_FOUND, ACCESS_ERROR,
  WRONG_DATA_MOVIE_DELETE, REMOVE_MOVIE_SUCCESS,
} = require('../utils/constants');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const newMovie = await Movie.create({ ...req.body, owner: req.user._id });
    res.status(CREATE_CODE_SUCCESS).send(newMovie);
  } catch (err) {
    if (err instanceof errMongo.ValidationError) {
      next(new BadRequestError(WRONG_DATA_MOVIE));
    } else {
      next(err);
    }
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new NotFoundError(MOVIE_NOT_FOUND);
    }
    if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError(ACCESS_ERROR);
    }
    await Movie.deleteOne(movie);
    res.send({ message: REMOVE_MOVIE_SUCCESS });
  } catch (err) {
    if (err instanceof errMongo.CastError) {
      next(new BadRequestError(WRONG_DATA_MOVIE_DELETE));
    } else {
      next(err);
    }
  }
};
