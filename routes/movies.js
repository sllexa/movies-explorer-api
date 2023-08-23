const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:id', validateMovieId, deleteMovie);

module.exports = router;
