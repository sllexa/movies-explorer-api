const bcrypt = require('bcrypt');
const errMongo = require('mongoose').Error;
const User = require('../models/user');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const NotFoundError = require('../utils/errors/NotFoundError');
const { generateToken } = require('../utils/token');
const {
  CREATE_CODE_SUCCESS, EMAIL_ALREADY_EXISTS, WRONG_DATA_USER,
  AUTHORIZATION_SUCCESS, LOG_OUT_MESSAGE, USER_NOT_FOUND,
} = require('../utils/constants');

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const newUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    res.status(CREATE_CODE_SUCCESS).send(newUser);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(EMAIL_ALREADY_EXISTS));
    } else if (err instanceof errMongo.ValidationError) {
      next(new BadRequestError(WRONG_DATA_USER));
    } else {
      next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = generateToken({ _id: user._id });
    res.cookie('token', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    }).send({ message: AUTHORIZATION_SUCCESS });
  } catch (err) {
    next(err);
  }
};

module.exports.signOut = async (req, res, next) => {
  try {
    await res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.send({ message: LOG_OUT_MESSAGE });
  } catch (err) {
    next(err);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user._id.toString() !== req.user._id) {
      throw new ConflictError(EMAIL_ALREADY_EXISTS);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );
    res.send(updatedUser);
  } catch (err) {
    if (err instanceof errMongo.ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};
