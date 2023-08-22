const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { login, register, signOut } = require('../controllers/users');
const NotFoundError = require('../utils/errors/NotFoundError');
const { URL_NOT_FOUND } = require('../utils/constants');

router.post('/signup', register);
router.post('/signin', login);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('/signout', signOut);

router.use('*', (req, res, next) => {
  next(new NotFoundError(URL_NOT_FOUND));
});

module.exports = router;
