const express = require('express');
const app = express();

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
    res.json('get usuario');
});

app.post('/usuario', (req, res) => {
    res.json('post usuario');
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });

});
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
});

app.listen(3000, () => {
    console.log('Escuchando puerto: ', 3000);
})