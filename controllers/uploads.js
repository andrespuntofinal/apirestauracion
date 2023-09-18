const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);



const { response } = require('express');
const { subirArchivo } = require('../helpers');
const   Miembro    = require('../models/miembro');
const   Evento    = require('../models/evento');



const cargarArchivo = async (req, res = response) =>{
   
    try {

        const nombre = await subirArchivo ( req.files, undefined );

        res.json({ nombre })
        
    } catch (msg) {

        res.status(400).json({ msg });
        
    }
    
  

}

const actualizarImagen = async (req, res = response ) =>{

 
    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'miembros':

       
         modelo = await Miembro.findById(id);

          if ( !modelo ) {

            return res.status(400).json({ msg: `No existe un usuario con el id ${id}`});
            
          }

            
            break;

            case 'eventos':

       
            modelo = await Evento.findById(id);
   
             if ( !modelo ) {
   
               return res.status(400).json({ msg: `No existe un evento con el id ${id}`});
               
             }
   
               
               break;
    
        default:
            return res.status(500).json({ msg: 'Se olvidó validar esto'});
    }

    //Limpiar img previas

    if (modelo.imagen) {

      const pathImagen = path.join( __dirname, '../uploads', modelo.imagen );

      if( fs.existsSync( pathImagen ) ){

          fs.unlinkSync( pathImagen );
      }
      
    }

    const nombre = await subirArchivo ( req.files, undefined );
    modelo.imagen = nombre;

    await modelo.save();

    res.json({ modelo })

}

const actualizarImagenCloudinary = async (req, res = response ) =>{

 
  const { id, coleccion } = req.params;

  let modelo;

  switch ( coleccion ) {
      case 'miembros':

     
       modelo = await Miembro.findById(id);

        if ( !modelo ) {

          return res.status(400).json({ msg: `No existe un usuario con el id ${id}`});
          
        }

          
          break;

          case 'eventos':

     
          modelo = await Evento.findById(id);
 
           if ( !modelo ) {
 
             return res.status(400).json({ msg: `No existe un evento con el id ${id}`});
             
           }
 
             
             break;
  
      default:
          return res.status(500).json({ msg: 'Se olvidó validar esto'});
  }

  //Limpiar img previas

  if (modelo.imagen) {

    const nombreArr = modelo.imagen.split('/');
    const nombre = nombreArr [ nombreArr.length - 1 ];
    const [ public_id ] = nombre.split('.');

    cloudinary.uploader.destroy( public_id );

      
    
  }

  //console.log(req.files.archivo);

  //tempFilePath

  const { tempFilePath } = req.files.archivo
  const  { secure_url } = await cloudinary.uploader.upload( tempFilePath );

  
  modelo.imagen = secure_url;

  await modelo.save();

  res.json( modelo );

}

const mostrarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch ( coleccion ) {
      case 'miembros':

     
       modelo = await Miembro.findById(id);

        if ( !modelo ) {

          return res.status(400).json({ msg: `No existe un usuario con el id ${id}`});
          
        }

          
          break;

          case 'eventos':

     
          modelo = await Evento.findById(id);
 
           if ( !modelo ) {
 
             return res.status(400).json({ msg: `No existe un evento con el id ${id}`});
             
           }
 
             
             break;
  
      default:
          return res.status(500).json({ msg: 'Se olvidó validar esto'});
  }

  //Limpiar img previas

  if (modelo.imagen) {

    const pathImagen = path.join( __dirname, '../uploads', modelo.imagen );

    if( fs.existsSync( pathImagen ) ){

       return res.sendFile( pathImagen )
    }
    
  }

  const pathImagen = path.join( __dirname, '../assets/no-image.jpg')

  res.sendFile( pathImagen );
}

module.exports = {

    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}