require('./config/config');
const colors = require('colors');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function (req, res) {
    res.json('get usuario')
})
app.post('/usuario', function (req, res) {

    let body = req.body;

    if(body.nombre === undefined){
        res.status(400).json({
            ok:false,
            mensaje:'Nombre no valido'
        })
    }else{
        res.json({
            persona:body
        })
    }
    
})

app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;

    res.json({
        id
    })
})
app.delete('/usuario', function (req, res) {
    res.json('delete Usuario')
})

mongoose.connect('mongodb://localhost:27017/cafe', {useNewUrlParser: true}, (err,res) => {

if(err) throw err;

console.log('Base de datos ONLINE'.green)
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`)
})