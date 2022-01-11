const { Router } = require('express');
const { check, body } = require('express-validator');
const { loginThird, renewToken } = require('../controllers/terceros');
const { validarJWT } = require('../middleware/validar-jwt');
const { soul_terceros } = require('../models');
const { validarCampos } = require('../middleware/validar-campos');
const bcrypt = require('bcryptjs');

const router = Router();

router.post('/login', [
    check('email', 'El usuario es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    body('email').custom(async (value, { req }) => {
        const { password } = req.body

        const usuario = await soul_terceros.findOne({
            where: { codigo: value }
        })
        if (!usuario)
            return Promise.reject('Usuario o contraseña incorrecta')
        const res = await bcrypt.compare(password, usuario.clave);
        
        if (!res)
            return Promise.reject('Usuario o contraseña incorrecta')
    }),
    validarCampos
], loginThird)

router.get('/renew', [validarJWT, validarCampos], renewToken)

module.exports = router