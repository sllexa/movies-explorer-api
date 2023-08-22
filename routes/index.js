const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { login, register, signOut } = require('../controllers/users');
const NotFoundError = require('../utils/errors/NotFoundError');
const { URL_NOT_FOUND } = require('../utils/constants');
const { validateRegistration, validateLogin } = require('../middlewares/validations');
const auth = require('../middlewares/auth');

router.post('/signup', validateRegistration, register);
router.post('/signin', validateLogin, login);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('/signout', signOut);

router.use('*', (req, res, next) => {
  next(new NotFoundError(URL_NOT_FOUND));
});

module.exports = router;
