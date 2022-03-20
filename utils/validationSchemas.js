const Joi = require('joi')

const parkSchema = Joi.object({
    park: Joi.object({
        nombre: Joi.string().required(),
        region: Joi.string().required(),
        comuna: Joi.string().required(),
        provincia: Joi.string().required(),
        superficie: Joi.number().min(0),
        descripcion: Joi.string().allow(''),
    }).required(),
    deleteImages: Joi.array(),
    longitude: Joi.number(),
    latitude: Joi.number()
})

const reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.string().min(0).max(5).required()
    }).required()
})

module.exports.parkSchema = parkSchema
module.exports.reviewSchema = reviewSchema