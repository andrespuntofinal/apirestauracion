const Miembro = require('../models/miembro');
const Aporte = require('../models/aporte');
const Role = require('../models/role');
const Ministerio = require('../models/ministerio');
const Tipoaporte = require('../models/tipoaporte');
const Usuario = require('../models/usuario');
const Evento = require('../models/evento');
const Reserva = require('../models/reserva');

const esRolValido = async (rol='') => {
    const existeRol = await Role.findOne({ rol });

    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no está registrado en la DB`);
        
    }
}

const esMinisterioValido = async (ministerio='') => {
    const existeministerio = await Ministerio.findOne({ ministerio });

    if ( !existeministerio ) {
        throw new Error(`El ministerio ${ministerio} no está registrado en la DB`);
        
    }
}

const esTipoaporteValido = async (tipo_aporte='') => {
    const existetipoaporte = await Tipoaporte.findOne({ tipo_aporte });

    if ( !existetipoaporte ) {
        throw new Error(`El tipo de aporte ${tipo_aporte} no está registrado en la DB`);
        
    }
}



const emailExiste = async (email ='') => {
     //Verificar correo
     const existeEmail = await Usuario.findOne({ email })

     if ( existeEmail ) {
        throw new Error(`El Correo ${email} ya está registrado`);
     }
  
}

const existeUsuarioPorId = async ( id ) => {
    //Verificar correo
    const existeUsuario = await Usuario.findById(id);

    if ( !existeUsuario ) {
       throw new Error(`El id no existe ${ id }`);
    }
 
}

const existeMiembroPorId = async ( id ) => {
    //Verificar correo
    const existeMiembro = await Miembro.findById(id);

    if ( !existeMiembro ) {
       throw new Error(`El id no existe ${ id }`);
    }
 
}

const existeAportePorId = async ( id ) => {
    //Verificar correo
    const existeAporte = await Aporte.findById(id);

    if ( !existeAporte ) {
       throw new Error(`El id no existe ${ id }`);
    }
 
}

const existeEventoPorId = async ( id ) => {
    //Verificar correo
    const existeEvento = await Evento.findById(id);

    if ( !existeEvento ) {
       throw new Error(`El id no existe ${ id }`);
    }
 
}

const existeReservaPorId = async ( id ) => {
    //Verificar correo
    const existeReserva = await Reserva.findById(id);

    if ( !existeReserva ) {
       throw new Error(`El id no existe ${ id }`);
    }
 
}

//validar colecciones

const coleccionesPermitidas = (coleccion = '', colecciones = []) =>{

    const incluida = colecciones.includes( coleccion );

    if (!incluida) {

        throw new Error(`La colección ${ coleccion } no es permitida`);
        
    }
    return true;

}


module.exports = {

    esRolValido,
    esMinisterioValido,
    emailExiste,
    existeUsuarioPorId,
    existeMiembroPorId,
    existeAportePorId,
    esTipoaporteValido,
    existeEventoPorId,
    existeReservaPorId,
    coleccionesPermitidas
}