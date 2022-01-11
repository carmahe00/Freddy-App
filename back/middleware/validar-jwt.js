const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { soul_usuarios } = require('../models');

const validarJWT = (req = request, res = response, next) => {
    try {
        const token = req.header('Authorization')
        console.log('tokenRenew:',token)
        if (!token)
            return res.status(401).json({
                
                msg: "No hay token en la petición"
            })

        
        const { uuid} = jwt.verify(token, process.env.JWT_SECRET)
        
        req.uuid = uuid
        next()

    } catch (error) {
        console.log('No autorizado')
        return res.status(401).json({
            ok: false,
            msg: 'Token no es válido'
        })
    }
}

const validarADMIN_ROLE = async (req, resp, next) => {
    const uuid = req.uuid;
    
    try {
        const usuarioDB = await soul_usuarios.findOne({
            where: { uuid }
        });
        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no exite'
            })
        }

        if (usuarioDB.role !== 'ADMINISTRACION')
            return resp.status(403).json({
                ok: false,
                msg: 'Usuario no tiene privilegios para hacer eso'
            })

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const validarDESPACHO_ROLE = async (req, resp, next) => {
    const uuid = req.uuid;

    try {
        const usuarioDB = await soul_usuarios.findOne({
            where: { uuid }
        });
        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no exite'
            })
        }

        if (usuarioDB.role !== 'ADMINISTRACION' || usuarioDB.role !== 'DESPACHO')
            return resp.status(403).json({
                ok: false,
                msg: 'Usuario no tiene privilegios para hacer eso'
            })

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const validarCARTA_ROLE = async (req, resp, next) => {
    const uuid = req.uuid;

    try {
        const usuarioDB = await soul_usuarios.findOne({
            where: { uuid }
        });
        if (!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no exite'
            })
        }

        if (usuarioDB.role !== 'ADMINISTRACION' || usuarioDB.role !== 'CARTA')
            return resp.status(403).json({
                ok: false,
                msg: 'Usuario no tiene privilegios para hacer eso'
            })

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarDESPACHO_ROLE,
    validarCARTA_ROLE
}