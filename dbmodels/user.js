const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }
})

// al usar el plugin de passport-local-mongoose,
// este va a agregar al schema por detrás:
// - un username
// - un salt
// - una hashed password, 
// además agrega algunos métodos que nos van a ayudar.
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)