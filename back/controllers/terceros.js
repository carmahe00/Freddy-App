const { request, response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const index = require('../models');


const loginThird = async (req = request, res = response) => {
    try {
        const { email } = req.body
        const soul_terceros = await index.soul_terceros.findOne({
            where: { codigo: email }
        })
        const token = await generarJWT(soul_terceros.codigo, soul_terceros.codigo)
        return res.json({
            soul_terceros,
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
    
    const soul_terceros = await soul_terceros.findOne({
        where: { uuid: uuid }
    })
    const token = await generarJWT(uuid, soul_terceros.username);
    res.json({
        token,
        soul_terceros
    })
}

module.exports = {
    loginThird,
    renewToken
}