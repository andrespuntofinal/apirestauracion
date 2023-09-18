const {  response, request } = require('express');

const  Aporte  = require('../models/aporte');


const crearAporte = async (req, res = response) =>{

    const { estado, usuario, ...body } = req.body;


    //generar data a guardar

    const data = {
        ...body,
        usuario: req.usuario._id
    }

  
    const aporte = new Aporte( data );

    //guardar en DB

    await aporte.save();

    res.status(201).json(aporte);

}

//Consultar miembros

const obtenerAportes =async (req = request, res = response) => {

  //  const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
     
    const [ total, aportes ] = await Promise.all([
        Aporte.countDocuments(query),
        Aporte.find(query)
            .populate('usuario', 'nombre')
            .populate('miembro', 'nombre')
            


    ])

    res.json({
       
       total,
       aportes
    });
}

//consultar miembros por id

const obtenerAporte = async( req = request, res = response) => {

    const { id } = req.params;
    const aporte = await Aporte.findById( id )
                        .populate('usuario', 'nombre')
                        .populate('miembro', 'nombre');

    res.json( aporte );

} 

//modificar miembros 

const actualizarAporte = async( req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;


    const aporte = await Aporte.findByIdAndUpdate( id, data, { new: true } );

    res.json( aporte );

} 

//modificar miembros 

const eliminarAporte = async( req = request, res = response) => {

    const { id } = req.params;
    
    const aporteBorrado = await Aporte.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( aporteBorrado );

} 

module.exports = {
    crearAporte,
    obtenerAportes,
    obtenerAporte,
    actualizarAporte,
    eliminarAporte

}