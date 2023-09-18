const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async ( req = request, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ) {

        return res.status(401).json({

            msg: 'No hay token en la petición'
        });
        
    }

    try {


        const { uid } = jwt.verify( token, process.env.SECRETPRIVATEKEY );

        //leer usuario que corresponde al uid

        //  console.log( 'uid...', uid );

        const usuario = await Usuario.findById ( uid );

        if ( !usuario ) {

            return res.status(401).json({

                msg: 'token no válido - usuario no existe en DB'

            })
            
        }

        //verificar si el usuario es true

        if ( !usuario.estado ) {

            return res.status(401).json({

                msg: 'token no válido - usuario estado false'

            })
            
        }

        req.usuario = usuario ;
        next();
        
    } catch (error) {

        console.log( error );
        res.status(401).json({
            msg: 'No hay token en la petición'

        })
        
    }

   
}

module.exports = {
    validarJWT

}