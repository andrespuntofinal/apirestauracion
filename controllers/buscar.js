const {  response, request } = require('express');
const { ObjectId } = require('mongoose').Types;
const  Usuario  = require('../models/usuario');
const  Miembro  = require('../models/miembro');
const  Aporte  = require('../models/aporte');


const coleccionesPermitidas = [

    'usuarios',
    'miembros',
    'ministerios',
    'aportes'
];

const buscarUsuarios = async( termino = '', res = response ) =>{


    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {

        const usuario = await Usuario.findById( termino );
        return res.json( {

            results: ( usuario ) ? [ usuario ] : []

        } )
        
    }

const regex = new RegExp( termino, 'i' );

const usuarios = await Usuario.find( {

    $or: [{  nombre: regex }, { email: regex }],
    $and: [{ estado: true }]

 });

res.json({

    results: usuarios

});

}

const buscarMiembros = async( termino = '', res = response ) =>{


    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {

        const miembro = await Miembro.findById( termino );
        return res.json( {

            results: ( miembro ) ? [ miembro ] : []

        } )
        
    }

const regex = new RegExp( termino, 'i' );

const miembros = await Miembro.find( {

    $or: [{  nombre: regex }, { email: regex }, { numero_id: regex }, 
          { tipo_miembro: regex }, { ministerio: regex }, { tipo_miembro: regex },
          { poblacion: regex }, { estado_civil: regex }, { sexo: regex }
        ],
    $and: [{ estado: true }]

 });

res.json({

    results: miembros

});

}

const buscarAportes = async( termino = '', res = response ) =>{


    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {

        const aporte = await Aporte.findById( termino )
        .populate('miembro', 'nombre')
        .populate('usuario', 'nombre');
        return res.json( {

            results: ( aporte ) ? [ aporte ] : []

        } )
        
    }

    const regex = new RegExp( termino, 'i' );

    const aportes = await Aporte.find( {

    $or: [{  tipo_aporte: regex }
        ],
    $and: [{ estado: true }],
    

 })
        .populate('miembro', 'nombre')
        .populate('usuario', 'nombre');
 ;

res.json({

    results: aportes

});



}

const buscar = (req, res = response ) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes(coleccion) ) {

        return res.status(400).json({
            msg: 'Colección no permitida'

        })
        
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios( termino, res );
            
        break;

        case 'miembros':
            buscarMiembros( termino, res );
            
        break;

        case 'aportes':
            buscarAportes( termino, res );
            
        break;

        default:
            res.status(500).json({

                msg: 'Se olvidó'
            })
    
        
    }


  }

module.exports = {

    buscar
}