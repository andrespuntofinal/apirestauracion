const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);

//firebase
const { admin } = require('../database/config');

const { response } = require('express');
const { subirArchivo } = require('../helpers');
const   Miembro    = require('../models/miembro');
const   Evento    = require('../models/evento');

//admin.initializeApp({

 // credential: admin.credential.cert(serviceAccount),
 // storageBucket: 'webrestauracion-3240c'
//});

//const bucket = admin.storage().bucket();

// upload firebase


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

const actualizarImagenFirebase = async (req, res = response ) =>{

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


      console.log('imagen existesssssssssssssssss');
    
  }

 
  const { tempFilePath } = req.files.archivo

  console.log('imagen rutaaaaaa', tempFilePath );

  const bucket = admin.storage().bucket();
  const filePath = tempFilePath;
  const storagePath = 'img/' + req.files.archivo['name']; 

  try {
    await bucket.upload(filePath, {
      destination: storagePath,
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000' // Configura el tiempo de almacenamiento en caché del archivo (en este caso, 1 año)
      },
    });

    console.log('Archivo subido correctamente a Firebase Storage.');

    // Obtén la URL firmada del archivo que acabas de subir
const [urlFirebase] = await bucket.file(storagePath).getSignedUrl({
action: 'read',
expires: '03-09-2491' // Ajusta la fecha de caducidad de la URL según tus necesidades
});
console.log('URL de la imagen:', urlFirebase);

 //tempFilePath = "";

modelo.imagen = urlFirebase;

  } catch (error) {
    console.error('Error al subir el archivo:', error);
  }


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
    actualizarImagenCloudinary,
    actualizarImagenFirebase
}