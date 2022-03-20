const mongoose = require('mongoose')
const Review = require('./review.js')

const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String 
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload','/upload/w_200')
})

const ParkSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    comuna: {
        type: String,
        required: true
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    superficie: {
        type: Number
    },
    descripcion: {
        type: String
    },
    images: [ImageSchema], 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})


// delete middleware para eliminar los reviews cuando se elimina un parque
ParkSchema.post('findOneAndDelete', async function(doc) {
    // doc es el documento eliminado
    if (doc) { 
        await Review.deleteMany({ _id: {$in: doc.reviews }})
    }
})

module.exports = mongoose.model('Park', ParkSchema)