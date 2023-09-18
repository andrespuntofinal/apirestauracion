const {  response, request } = require('express');

const  Miembro  = require('../models/miembro');


const crearMiembro = async (req, res = response) =>{

    const nombre = req.body.nombre.toUpperCase();
    const numero_id = req.body.numero_id;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const celular = req.body.celular;
    const barrio = req.body.barrio;
    const direccion = req.body.direccion;
    const sexo = req.body.sexo;
    const poblacion = req.body.poblacion;
    const estado_civil = req.body.estado_civil;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const imagen = req.body.imagen;
    const tipo_miembro = req.body.tipo_miembro;
    const bautizado = req.body.bautizado;
    const fecha_membresia = req.body.fecha_membresia;
    const lider_contacto = req.body.lider_contacto;
    const ministerio = req.body.ministerio;


    //generar data a guardar

    const data = {

        nombre,
        numero_id,
        telefono,
        celular,
        email, 
        barrio, 
        direccion, 
        sexo, 
        poblacion, 
        estado_civil,
        fecha_nacimiento, 
        imagen, 
        tipo_miembro, 
        bautizado, 
        fecha_membresia, 
        lider_contacto,
        ministerio,
        usuario: req.usuario._id
    }

   // console.log("hhhhhh", data);

    const miembro = new Miembro( data );

    //guardar en DB

    await miembro.save();

    res.status(201).json(miembro);

}

//Consultar miembros

const obtenerMiembros =async (req = request, res = response) => {

    //const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
     
    const [ total, miembros ] = await Promise.all([
        Miembro.countDocuments(query),
        Miembro.find(query)
            .populate('usuario', 'nombre')
            


    ])

    res.json({
       
       total,
       miembros
    });
}

//consultar miembros por id

const obtenerMiembro = async( req = request, res = response) => {

    const { id } = req.params;
    const miembro = await Miembro.findById( id ).populate('usuario', 'nombre');

    res.json( miembro );

} 

//modificar miembros 

const actualizarMiembro = async( req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;


    const miembro = await Miembro.findByIdAndUpdate( id, data, { new: true } );

    res.json( miembro );

} 

//modificar miembros 

const eliminarMiembro = async( req = request, res = response) => {

    const { id } = req.params;
    
    const miembroBorrado = await Miembro.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( miembroBorrado );

} 

module.exports = {
    crearMiembro,
    obtenerMiembros,
    obtenerMiembro,
    actualizarMiembro,
    eliminarMiembro

}