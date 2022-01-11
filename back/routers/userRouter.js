const { Router } = require('express');
const { check, body } = require('express-validator');
const { loginUser, renewToken } = require('../controllers/usuario');
const { validarJWT } = require('../middleware/validar-jwt');
const { soul_usuarios } = require('../models');
const { validarCampos } = require('../middleware/validar-campos');
const bcrypt = require('bcryptjs');

const router = Router();

router.post('/login', [
    check('email', 'El usuario es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    body('email').custom(async (value, { req }) => {
        const { password } = req.body

        const usuario = await soul_usuarios.findOne({
            where: { login: value }
        })
        if (!usuario)
            return Promise.reject('Usuario o contraseña incorrecta')

        const res = bcrypt.compareSync(password, usuario.clave2);

        if (!res)
            return Promise.reject('Usuario o contraseña incorrecta')

    }),
    validarCampos
], loginUser)

router.get('/renew', [validarJWT, validarCampos], renewToken)

module.exports = router