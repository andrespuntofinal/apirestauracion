const { response } = require('express');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleverify } = require('../helpers/google-verify');

const login = async(req, res = response ) => {

    const { email, uid } = req.body;

    try {

        //verificar email

        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {

            return res.status(400).json({

                msg: 'Usuario - Contraseñea no son correctos - email'

            });
            
        }

        // verificar estado del usuario
        if ( !usuario.estado ) {

            return res.status(400).json({

                msg: 'Usuario - Contraseñea no son correctos - estado'

            });
            
        }

        // verificar uid

        const usuarioid = await Usuario.findOne({ uid });

        if ( !usuarioid ) {

            return res.status(400).json({

                msg: 'Usuario - Contraseñea no son correctos - uid'
                

            });
            
        }

        //generar JWT

        console.log('id antes...',usuario.id);

        //const token = await generarJWT( usuario.uid );
        const token = await generarJWT( usuario.id );


        res.json({

            usuario,
            token

        })
        
    } catch (error) {

        console.log(error)

        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
        
    }

 
}

const googleSingIn = async(req, res = response )=>{

    const { id_token } = req.body;
    

    try {

    //const  email  = 'andrespuntofinal@gmail.com';

    const {nombre, img, email, uid } = await googleverify( id_token );
    
    const query = { email: email };

    //console.log('uid', uid);
         
    let [ usuario ] = await  Usuario.find( query )

      //Validar si usuario existe
       if ( !usuario) {

        

        //crear usuario

        const data = {
            nombre,
            email,
            rol: 'ADMIN_ROLE',
            estado: true,
            uid
        };

        
    
        usuario = new Usuario( data );
        await usuario.save();
            
    }

    //validar si el usuario está activo en la DB

    if ( !usuario.estado ) {

        return res.status(401).json({
    
            msg: 'Usuario bloqueado'
        });
                
    }

            //generar JWT
            const token = await generarJWT( usuario.id );

            //console.log (googleUser);
    
            res.json({
    
                usuario,
                token
        
            });   

        
    } catch (error) {

        res.status(400).json({

            ok: false,
            msg:'El token no se pudo verificar'

        });
        
    }


}

module.exports = {

    login,
    googleSingIn

}