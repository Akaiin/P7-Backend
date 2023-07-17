const express = require('express')
const bookController = require('../controllers/book')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.use(express.json())

router.post('/', auth, multer, bookController.addBook)

router.get('/:id', bookController.getOneBook)

router.put('/:id', auth, multer, bookController.updateBook)

router.delete('/:id', auth, bookController.deleteBook)

router.use('/', bookController.getAllBooks)

module.exports = router
