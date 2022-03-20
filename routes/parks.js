const express = require('express')
const router = express.Router()

const parks = require('../controllers/parks.js')

const catchAsync = require('../utils/catchAsync.js')
const { isLoggedIn, isParkAuthor, validatePark } = require('../middleware.js')

const { storage } = require('../cloudinary/index.js')
const multer  = require('multer')
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(parks.index))
    // image es el nombre del input field del form que va a agregar la imagen
    .post(isLoggedIn, upload.array('image'), validatePark, catchAsync(parks.createPark))

router.get('/new', isLoggedIn, parks.renderNewForm)

router.route('/:id')
    .get(catchAsync(parks.showPark))
    .put(isLoggedIn, isParkAuthor, upload.array('image'), validatePark, catchAsync(parks.updatePark))
    .delete(isLoggedIn, isParkAuthor, catchAsync(parks.deletePark))

router.get('/:id/edit', isLoggedIn, isParkAuthor, catchAsync(parks.renderEditForm))


module.exports = router