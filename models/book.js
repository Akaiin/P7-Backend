const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    userId: { type: String },
    title: { type: String },
    author: { type: String },
    year: { type: String },
    imageUrl: { type: String },
    genre: { type: String },
    ratings: [
        {
            userId: { type: String },
            grade: { type: Number },
        },
    ],
    averageRating: { type: Number },
})

module.exports = mongoose.model('Book', bookSchema)
