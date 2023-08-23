const AuthorizedError = require('../utils/errors/AuthorizedError');
const { AUTHORIZATION_REQUIRED } = require('../utils/constants');
const { checkToken } = require('../utils/token');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  if (!token) {
    throw new AuthorizedError(AUTHORIZATION_REQUIRED);
  }

  try {
    payload = checkToken(token);
  } catch (err) {
    next(new AuthorizedError(AUTHORIZATION_REQUIRED));
  }
  req.user = payload;
  next();
};
