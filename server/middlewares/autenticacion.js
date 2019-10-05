const jwt = require('jsonwebtoken');
//====================
//VERIFICAR TOKEN
//====================

let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'token no valido'
            });
        }

        req.usuario = decoded.usuario;
        next();

    });
    // res.json({
    //     token: token
    // });
    //console.log(`token:${token}`);

};

module.exports = { verificaToken }