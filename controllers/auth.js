const User = require('../dbmodels/user.js')

module.exports.renderRegisterForm = (req,res) => {
    res.render('users/register.ejs')
}

module.exports.registerUser = async (req,res,next) => {
    try {
        const {email, username, password} = req.body
        const newUser = new User({email, username})
        // user.register también lo guarda automaticamente en la bd
        // no hay que hacer registeredUSer.save()
        const registeredUser = await User.register(newUser, password)
        req.login(registeredUser, err => { // para iniciar sesion altiro
            if (err) return next(err)
            req.flash('success','Bienvenido!')
            res.redirect('/parks')
        })
    } catch (err) {
        console.log(err.message)
        req.flash('error', err.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req,res,next) => {
    if (req.headers.referer && !req.session.returnTo) { 
        // si hay algo en headers.referer y no se ha seteado returnTo en isLoggedIn middleware
        // guardar url de origen para redireccionar una vez logeado
        const originURL = new URL(req.headers.referer)
        req.session.returnTo = originURL.pathname
    }
    res.render('users/login.ejs')
}

module.exports.login = (req,res,next) => {
    req.flash('success','Bienvenido!')
    const redirectUrl = req.session.returnTo || '/parks'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req,res,next) => {
    req.logout() // metodo agregado por passport
    res.redirect('/parks')
}