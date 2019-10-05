<<<<<<< HEAD
const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/usuario', (req, res) => {
=======
const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken } = require('../middlewares/autenticacion');
const bodyParser = require('body-parser');
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));

app.get('/usuario', verificaToken, (req, res) => {
>>>>>>> e4ed4f09c8ac882875dd04892aa28ccca8533286

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({}, 'nombre correo rol estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({ estado: false }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });

<<<<<<< HEAD
        })


=======
        });
>>>>>>> e4ed4f09c8ac882875dd04892aa28ccca8533286
});

app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        correo: body.correo,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'correo', 'img', 'estado', 'role']);



    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })


});
app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['estado']);

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no existe'

                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    })

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     };
    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'usuario no existe'

    //             }
    //         });
    //     }
    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });
    // });


});

module.exports = app;