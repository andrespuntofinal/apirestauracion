const {  response, request } = require('express');

const  Evento  = require('../models/evento');


const crearEvento = async (req, res = response) =>{

    const {...body } = req.body;


    //generar data a guardar

    const data = {
        ...body
    }

    //console.log("data...", data)

  
    const evento = new Evento( data );

    //guardar en DB

    await evento.save();

    res.status(201).json(evento);

}

//Consultar miembros

const obtenerEventos =async (req = request, res = response) => {

   // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
     
    const eventos = await 
       // Evento.countDocuments(query),
        Evento.find(query)
          //  .skip( Number(desde) )
         //   .limit( Number(limite) )


    

    res.json( eventos );
}

//consultar miembros por id

const obtenerEvento = async( req = request, res = response) => {

    const { id } = req.params;

    //console.log("obtener id", id)

    
    const evento = await Evento.findById( id )
    
    res.json( evento );

} 

//modificar miembros 

const actualizarEvento = async( req = request, res = response) => {

    const { id } = req.params;
    const { ...data } = req.body;
   
    const evento = await Evento.findByIdAndUpdate( id, data, { new: true } );

    res.json( evento );

} 

//modificar miembros 

const eliminarEvento = async( req = request, res = response) => {

    const { id } = req.params;
    
    const eventoBorrado = await Evento.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( eventoBorrado );

} 

module.exports = {
    crearEvento,
    obtenerEventos,
    obtenerEvento,
    actualizarEvento,
    eliminarEvento

}