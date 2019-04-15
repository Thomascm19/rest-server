require('./config/config');
const colors = require('colors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Se llama al usuario
app.use( require ('./routes/user') )

//Se realiza la conexion a la DB
mongoose.connect(process.env.URLDB, 
                {useNewUrlParser: true,useCreateIndex: true}, (err,res) => {

if(err) throw err;

console.log('Base de datos ONLINE'.green)
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`)
})