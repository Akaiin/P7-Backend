const express = require('express')
const app = express()
const booksRoutes = require('./routes/books')
const userRoutes = require('./routes/user')
const path = require('path')
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')
require('dotenv').config()

mongoose

    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/books', booksRoutes)
app.use('/api/auth', userRoutes)

module.exports = app
