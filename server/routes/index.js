const express = require('express');
const router = express.Router();
const BookController = require('../controllers/book.controller');

router.get('/books', BookController.get);
router.post('/books', BookController.create);
module.exports = router;