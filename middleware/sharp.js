const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const resizeImageFile = (req, res, next) => {
    if (!req.file) return next()

    const imageInput = req.file.path
    const imageOutput = req.file.path.replace(/\.(jpg|jpeg|png)$/, '.webp')

    sharp(imageInput)
        .resize({ width: 360, height: 570 })
        .webp({ quality: 100, lossless: true })
        .toFile(imageOutput, (error) => {
            if (error) {
                console.error("Erreur lors de la modification de l'image :", error)
                next()
            } else {
                fs.unlink(imageInput, (unlinkError) => {
                    if (unlinkError) {
                        console.error("Erreur lors de la suppression de l'image originale :", unlinkError)
                    }

                    req.file.path = imageOutput
                    req.file.mimetype = 'image/webp'
                    req.file.filename = req.file.filename.replace(/\.(jpg|jpeg|png)$/, '.webp')

                    next()
                })
            }
        })
}

module.exports = resizeImageFile
