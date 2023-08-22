const mongoose = require('mongoose');
const validator = require('validator');
const { WRONG_URL_FORMAT } = require('../utils/constants');

const urlValidator = {
  validator: (v) => validator.isURL(v),
  message: ({ value }) => `${value} - ${WRONG_URL_FORMAT}`,
};

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Нужно ввести Страну.'],
  },
  director: {
    type: String,
    required: [true, 'Нужно ввести Режиссера.'],
  },
  duration: {
    type: Number,
    required: [true, 'Нужно ввести Длительность фильма (мин.).'],
  },
  year: {
    type: String,
    required: [true, 'Нужно ввести год выпуска фильма.'],
  },
  description: {
    type: String,
    required: [true, 'Нужно ввести описание фильма.'],
  },
  image: {
    type: String,
    required: [true, 'Нужна ссылка на постер к фильму.'],
    validate: urlValidator,
  },
  trailerLink: {
    type: String,
    required: [true, 'Нужна ссылка на трейлер фильма.'],
    validate: urlValidator,
  },
  thumbnail: {
    type: String,
    required: [true, 'Нужна ссылка на миниатюрное изображение постера к фильму.'],
    validate: urlValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Нужно ввести название фильма на русском языке.'],
  },
  nameEN: {
    type: String,
    required: [true, 'Нужно ввести название фильма на английском языке.'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
