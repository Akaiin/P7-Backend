const express = require('express')

const app = express()
const mongoose = require('mongoose')

mongoose
    .connect(
        'mongodb+srv://akain1612:NcLUCzmSkn9Ku9Jd@cluster0.81gt7wr.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(express.json())

app.post('/api/books', (req, res, next) => {
    console.log(req.body)
    res.status(201).json({
        message: 'Le livre à été ajouté avec succès !',
    })
})

app.get('/api/books', (req, res, next) => {
    const books = [
        {
            _id: 'PropTypeTTs.string',
            userId: 'PropTypes.string',
            title: 'PropTypes.string',
            author: 'PropTypes.string',
            year: 7,
            imageUrl: '',
            genre: 'PropTypes.string',
            ratings: [
                {
                    userId: 'PropTypes.string',
                    grade: 'PropTypes.number',
                },
            ],
            averageRating: 'PropTypes.number',
        },
        {
            _id: 'PropTypes.string',
            userId: 'PropTypes.string',
            title: 'PropTypes.string',
            author: 'PropTypes.string',
            year: 7,
            imageUrl: '',
            genre: 'PropTypes.string',
            ratings: [
                {
                    userId: 'PropTypes.string',
                    grade: 'PropTypes.number',
                },
            ],
            averageRating: 'PropTypes.number',
        },
    ]
    res.status(200).json(books)
})
module.exports = app
