const express = require('express')
const bookController = require('../controllers/book')
const router = express.Router()

router.post('/', bookController.addBook)

router.get('/:id', bookController.getOneBook)

router.put('/:id', bookController.updateBook)

router.delete('/:id', bookController.deleteBook)

router.use('/', bookController.getAllBooks)

module.exports = router
