const { response, request } = require('express');
const Usuario = require('../models/usuario');


const usuariosGet =async (req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    
    

    //const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
     
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
           


    ])

    res.json({
       total,
       usuarios
    });
}

const usuariosGetById =async (req = request, res = response) => {

    const { id } = req.params;
    //const query = { estado: true };
    //const uuid = req.params;
    const query = { uid: id };
    
         
    const [ usuarios ] = await Promise.all([
       
        Usuario.find( query )


    ])

    //console.log("PPPPPP" + req.params);

    res.json({
       
       
       usuarios
    });
}

const usuariosPost = async (req, res = response) => {

const { nombre, email, rol, uid, estado } = req.body;
const usuario =  new Usuario ( { nombre, email, rol, uid, estado } );

    await usuario.save();

    res.json({
        
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    //validar contra db

const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

   const { id } = req.params;
     
   const usuario = await Usuario.findByIdAndUpdate( id, { estado:false } );
   
    res.json( usuario );
}




module.exports = {
    usuariosGet,
    usuariosGetById,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}