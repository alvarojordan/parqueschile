const Park = require('../dbmodels/park.js')
const Review = require('../dbmodels/review.js')

module.exports.createReview = async (req,res) => {
    const id = req.params.id
    const park = await Park.findById(id)
    const newReviewData = req.body.review
    const review = new Review(newReviewData)
    review.author = req.user._id
    park.reviews.push(review)
    await review.save()
    await park.save()
    req.flash('success','Comentario agregado')
    res.redirect('/parks/'+park._id)
}

module.exports.deleteReview = async (req,res)=> {
    const {id, review_id} = req.params
    await Park.findByIdAndUpdate(id, {$pull: {reviews: review_id}})
    await Review.findByIdAndDelete(review_id)
    req.flash('success','Comentario eliminado')
    res.redirect('/parks/'+id)
}