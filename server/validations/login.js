const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  const errors = [];
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.username)) {
    errors[0] = 'Username field is required';
  }

  if (
    !Validator.isEmpty(data.username) &&
    !Validator.isLength(data.username, { min: 2, max: 25 })
  ) {
    errors[0] = 'Username must between 2 and 25 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors[1] = 'Password field is required';
  }

  if (
    !Validator.isEmpty(data.password) &&
    !Validator.isLength(data.password, { min: 6, max: 30 })
  ) {
    errors[1] = 'Password must between 6 and 30 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
