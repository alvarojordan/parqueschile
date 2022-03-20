const express = require('express')
const router = express.Router({mergeParams: true})

const reviews = require('../controllers/reviews.js')

const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware.js')
const catchAsync = require('../utils/catchAsync.js')


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:review_id', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router