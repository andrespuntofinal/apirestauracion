const {  response, request } = require('express');

const  Reserva  = require('../models/reserva');


const crearReserva = async (req, res = response) =>{

    const {...body } = req.body;


    //generar data a guardar

    const data = {
        ...body
    }

    //console.log("data...", data)

  
    const reserva = new Reserva( data );

    //guardar en DB

    await reserva.save();

    res.status(201).json(reserva);

}

//Consultar miembros

const obtenerReservas =async (req = request, res = response) => {

   // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
     
    const [ total, reserva ] = await Promise.all([
       // Evento.countDocuments(query),
       Reserva.find(query)
           


    ])

    res.json({
       
       total,
       reserva
    });
}

//consultar miembros por id

const obtenerReserva = async( req = request, res = response) => {

    const { id } = req.params;

    //console.log("obtener id", id)

    
    const reserva = await Reserva.findById( id )
    
    res.json( reserva );

} 

//modificar miembros 

const actualizarReserva = async( req = request, res = response) => {

    const { id } = req.params;
    const { ...data } = req.body;
   
    const reserva = await Reserva.findByIdAndUpdate( id, data, { new: true } );

    res.json( reserva );

} 

//modificar miembros 

const eliminarReserva = async( req = request, res = response) => {

    const { id } = req.params;
    
    const reservaBorrado = await Reserva.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( reservaBorrado );

} 

module.exports = {
    crearReserva,
    obtenerReservas,
    obtenerReserva,
    actualizarReserva,
    eliminarReserva

}