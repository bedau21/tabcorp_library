const { to } = require('await-to-js');
const pe = require('parse-error');

const toUtils = async promise => {
  const [err, res] = await to(promise);
  if (err) return [pe(err)];
  return [null, res];
};
module.exports.to = toUtils;

module.exports.ResponseError = function ResponseError(res, err, code) {
  let error = err;
  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    error = err.message;
  }

  if (typeof code !== 'undefined') res.statusCode = code;
  return res.json({ success: false, errors: error });
};

module.exports.ResponseSuccess = function ResponseSuccess(res, data, code) {
  let sendData = { success: true, message: 'Success' };

  if (typeof data === 'object') {
    sendData = Object.assign(sendData, data);
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json(sendData);
};

module.exports.ThrowError = function ThrowError(message, log) {
  if (log === true) {
    console.error(message);
  }

  throw new Error(message);
};
