const Book = require('../models/book');
const {
  to,
  ResponseError,
  ResponseSuccess,
} = require('../services/util.service');

const get = async function get(req, res) {
  const [err, books] = await to(Book.find());
  if (err) return ResponseError(res, err.message);
  return ResponseSuccess(res, { data: books });
};
module.exports.get = get;

const create = async function create(req, res) {
  const { body } = req;
  const [err, book] = await to(Book.create({ ...body }));
  if (err) return ResponseError(res, err.message);
  return ResponseSuccess(res, { data: book });
};
module.exports.create = create;