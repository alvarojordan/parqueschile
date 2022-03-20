const {parkSchema, reviewSchema} = require('./utils/validationSchemas.js')
const ExpressError = require('./utils/ExpressError.js')
const Park = require('./dbmodels/park.js')
const Review = require('./dbmodels/review.js')

module.exports.isLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error','Debes iniciar sesión primero')
        return res.redirect('/login')
    }
    next()
}

module.exports.isParkAuthor = async (req,res,next) => {
    const id = req.params.id
    const foundPark = await Park.findById(id)
    // check authorization
    if (!foundPark.author.equals(req.user._id)) {
        req.flash('error','No tienes permiso para editar este parque')
        return res.redirect('/parks/'+foundPark._id)
    }

    next()
}

module.exports.isReviewAuthor = async (req,res,next) => {
    const {id, review_id} = req.params
    const foundReview = await Review.findById(review_id)
    // check authorization
    if (!foundReview.author.equals(req.user._id)) {
        req.flash('error','No tienes permiso para editar este comentario')
        return res.redirect('/parks/'+id)
    }

    next()
}

module.exports.validatePark = (req,res,next) => {
    const validationResult = parkSchema.validate(req.body)

    if (validationResult.error) {
        const msg = validationResult.error.details.map(el => el.message).join(' / ')
        throw new ExpressError(400,msg)
    } else {
        next()
    }
}

module.exports.validateReview = (req,res,next) => {
    const validationResult = reviewSchema.validate(req.body)

    if (validationResult.error) {
        const msg = validationResult.error.details.map(el => el.message).join(' / ')
        throw new ExpressError(400,msg)
    } else {
        next()
    }
}