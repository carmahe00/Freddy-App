const { request, response } = require('express');
const { soul_usuarios } = require('../models');

const { generarJWT } = require('../helpers/jwt');

const loginUser = async (req = request, res = response) => {
    try {
        const { email } = req.body
        const soul_usuario = await soul_usuarios.findOne({
            where: { login: email }
        })
        const token = await generarJWT(soul_usuario.login, soul_usuario.clave2)
        return res.json({
            soul_usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

const renewToken = async (req = request, res = response) => {
    const { uuid } = req;
    
    const soul_usuario = await Soul_usuarios.findOne({
        where: { uuid: uuid }
    })
    const token = await generarJWT(uuid, soul_usuario.username);
    res.json({
        token,
        soul_usuario
    })
}

module.exports = {
    loginUser,
    renewToken
}