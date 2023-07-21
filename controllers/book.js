const Book = require('../models/book')
const fs = require('fs')

exports.addBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book)
    delete bookObject._id
    delete bookObject._userId
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })

    book.save()
        .then(() => {
            res.status(201).json({ message: 'Livre enregistré !' })
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(404).json({ error }))
}

exports.getBestrating = (req, res, next) => {
    Book.find({})
        .sort({ averageRating: -1 })
        .limit(3)
        .then((bestRatedBooks) => {
            res.status(200).json(bestRatedBooks)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.addRate = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            const currentUserId = req.auth.userId
            const existingRating = book.ratings.find((rating) => rating.userId === currentUserId)

            if (existingRating) {
                return res.status(400).json({ error: 'Note déjà ajoutée auparavant.' })
            } else {
                book.ratings.push({
                    userId: req.auth.userId,
                    grade: req.body.rating,
                })
            }
            const totalRatings = book.ratings.length
            const sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0)
            const averageRating = Math.round(sumRatings / totalRatings)
            book.averageRating = averageRating

            book.save()
                .then(() => {
                    res.status(200).json(book)
                })
                .catch((error) => {
                    res.status(400).json({ error })
                })
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.updateBook = (req, res, next) => {
    const bookObject = req.file
        ? {
              ...JSON.parse(req.body.book),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          }
        : { ...req.body }

    delete bookObject._userId
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' })
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Livre modifié!' }))
                    .catch((error) => res.status(401).json({ error }))
            }
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' })
            } else {
                const filename = book.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => {
                            res.status(200).json({ message: 'Livre supprimé !' })
                        })
                        .catch((error) => res.status(401).json({ error }))
                })
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }))
}
