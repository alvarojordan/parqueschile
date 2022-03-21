if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const parksRoutes = require('./routes/parks')
const reviewsRoutes = require('./routes/reviews')
const userRoutes = require('./routes/auth')
const mongoose = require('mongoose')
const ExpressError = require('./utils/ExpressError.js')
const User = require('./dbmodels/user.js')
const passport = require('passport')
const localStrategy = require('passport-local')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const park = require('./dbmodels/park')
const MongoStore = require('connect-mongo') //store para la session

// cloud:  process.env.DB_URL
// local:  'mongodb://localhost:27017/urbanParks'
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/urbanParks'
mongoose.connect(dbURL)
    .then(() => {
        console.log('MongoDB connection successful!')
    })
    .catch(err => {
        console.log('MongoDB connection ERROR')
        console.log(err)
    })

const secret = process.env.SECRET || 'temporarysecret'

const store = MongoStore.create({
    mongoUrl: dbURL,
    touchAfter: 24*60*60, //time after the session updates (in seconds)
    crypto: {
        secret
    }
})

// process.env.PORT no hay que crearla, estará automáticamente disponible en heroku
const port = process.env.PORT || 3000
const app = express()

// MIDDLEWARE
app.use(express.static(path.join(__dirname,'public'))) // serve static files
app.use(express.urlencoded({extended: true})) // parse the body
app.use(methodOverride('_method')) // para soportar PUT requests en html

const sessionConfig = {
    store: store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, // security feature. Las cookies son solo accesibles desde http, no desde javascript.
        maxAge: 1000 * 60 * 60 * 24 * 7 // la cookie expira en 1 semana
    }
}
app.use(session(sessionConfig)) // session para tener flash messages
app.use(flash())

// config helmet
const scriptSrcUrls = [
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
const imgSrcUrls = [
    "https://res.cloudinary.com/dpz0sgwyq/"  // cloudinary account
]
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: ["'self'","blob:","data:",...imgSrcUrls],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);


app.use(mongoSanitize())

app.use(passport.initialize())
// session para que las sesiones de usuario sean permanentes
// passport.session debe ser llamado después de session() (express-session)
app.use(passport.session()) 
// acá le dicemos que use la strategy asignada (local) y que para autenticar 
// use el método authenticate de User (agregado automáticamente a User por passport)
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next) => { 
    // para tener acceso a 'user' en los templates ejs.
    // req.user es generado automáticamente por passport.
    res.locals.currentUser = req.user

    // middleware para pasar los flash messages a res.locals.success (accesible desde los templates)
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

// EJS
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))

// ROUTES

app.use('/parks',parksRoutes)
app.use('/parks/:id/reviews',reviewsRoutes)
app.use('/',userRoutes)

app.get('/', (req,res) => {
    res.render('home.ejs')
})


app.all('*', (req,res,next) => {
    next(new ExpressError(404,'Página no encontrada'))
})

app.use((err,req,res,next) => {
    const { status = 500} = err
    if (!err.message) err.message = 'Ups, algo salió mal'
    res.status(status).render('error.ejs', {err})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})