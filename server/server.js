require('./config/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Configuración global de rutas
app.use(require('./routes/index'));

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());



mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {

    if (err) {
        throw err;
    } else {
        console.log('Base de datos ONLINE');
        console.log(process.env.URLDB);
    }

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})