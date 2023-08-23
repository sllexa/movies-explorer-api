const { celebrate, Joi } = require('celebrate');
const { LINK_REGEX } = require('../utils/constants');

module.exports.validateRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required().max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required().max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(LINK_REGEX),
    trailerLink: Joi.string().required().pattern(LINK_REGEX),
    thumbnail: Joi.string().required().pattern(LINK_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
