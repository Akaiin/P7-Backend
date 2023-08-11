const mongoose = require('mongoose')

const mongoURI = 'votre_lien_de_connexion_mongodb'

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://akain1612:NcLUCzmSkn9Ku9Jd@cluster0.81gt7wr.mongodb.net/?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        console.log('Connexion à MongoDB réussie !')
    } catch (error) {
        console.error('Connexion à MongoDB échouée !', error)
    }
}

module.exports = connectDB
