const { STATUS_CODES } = require('http');

function handleError(error, req, res, next) {
  const { status = 500 } = error;

  console.error('Error occurred:', error);

  const response = {
    status,
    message: status === 500 ? STATUS_CODES[status] : error.message || STATUS_CODES[status]
  };

  res.status(response.status).send(response);

  next();
}

module.exports = {
  handleError
};