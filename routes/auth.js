const express = require('express')
const router = express.Router()
const passport = require('passport')

const auth = require('../controllers/auth.js')

router.route('/register')
    .get(auth.renderRegisterForm)
    .post(auth.registerUser)

router.route('/login')
    .get(auth.renderLogin)
    .post(passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}), auth.login)
    // en post /login pasamos un middleware de passport que va a autentificar al usuario
    // - local strategy,
    // - failureFlash enviará automáticamente un flash si hay algún error
    // - failureRedirect redirigirá a la ruta especificada si hay algún error
    // IMPORTANTE: en el req.body, los datos deben venir con los mismos nombres que en el modelo de mongoose: username, password

router.get('/logout', auth.logout)

module.exports = router