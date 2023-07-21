const express = require('express')
const bookController = require('../controllers/book')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const resizeImageFile = require('../middleware/sharp')

router.use(express.json())

router.get('/', bookController.getAllBooks)

router.get('/bestrating', bookController.getBestrating)

router.get('/:id', bookController.getOneBook)

router.post('/', auth, multer, resizeImageFile, bookController.addBook)

router.post('/:id/rating', auth, bookController.addRate)

router.put('/:id', auth, multer, resizeImageFile, bookController.updateBook)

router.delete('/:id', auth, bookController.deleteBook)

module.exports = router
