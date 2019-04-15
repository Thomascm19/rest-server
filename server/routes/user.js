const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/modelUser');

app.get('/usuario', function (req, res) {
    
    //Se crea la consulta donde. 
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    // Se crea la condicion para mostar los datos deseados.
    Usuario.find({}, 'nombre email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec((err,usuarios) => {
                if(err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                Usuario.countDocuments({}, (err, conteo) => {
                    res.json({
                        ok:true,
                        usuarios,
                        cuantos: conteo
                    });
                })                
            })
})


app.post('/usuario', function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err,usuarioDB)=>{
       
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            usuario: usuarioDB
        });
    });    
});

app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','email','img','role','estado']);
    

    Usuario.findByIdAndUpdate(id,body,{new: true, runValidators:true},(err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });        
        }
        res.json({
            ok:true,
            usuario:usuarioDB
        })
    })    
})
app.delete('/usuario/:id', function (req, res) {
                       //Corresponde al id del URL.
    let id = req.params.id;

    Usuario.findByIdAndRemove(id,(err, usuarioEliminado)=> {
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });                                       
        };
        if(!usuarioEliminado){
            return res.status(400).json({
                ok:false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok:true,
            usuario: usuarioEliminado
        })
    })
})

module.exports = app;