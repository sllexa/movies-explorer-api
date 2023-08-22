const { ERROR_CODE_INTERNAL_SERVER_ERROR, SERVER_ERROR } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === ERROR_CODE_INTERNAL_SERVER_ERROR ? SERVER_ERROR : message,
  });
  next();
};
