const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const AuthorizedError = require('../utils/errors/AuthorizedError');
const { WRONG_EMAIL, WRONG_EMAIL_OR_PASSWORD } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Слишком короткое имя. Нужно минимум 2 символа.'],
    maxlength: [30, 'Слишком длинное имя. Должно быть не длиннее 30 символов.'],
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email занят'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: ({ value }) => `${value} - ${WRONG_EMAIL}`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizedError(WRONG_EMAIL_OR_PASSWORD));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizedError(WRONG_EMAIL_OR_PASSWORD));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
