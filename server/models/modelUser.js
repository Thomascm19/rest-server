const mongoose = require('mongoose');

let Shema = mongose.Shema;

let userShema = new Shema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        required: [true, 'El email es necesario']
    },
    password:{
        type: String,
        rquired: [true, 'La contraseña es necesaria']
    },
    img:{
        type: String,
        require: [false]
    },
    role: {
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User',userShema);