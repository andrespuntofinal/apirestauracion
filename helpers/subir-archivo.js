const path = require('path');
const {v4: uuidv4 } = require('uuid');
const subirArchivo = ( files, extensioneValidas = ['png','jpg'], carpeta = '' ) =>{

    return new Promise (( resolve, reject ) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1];
    
        //validar la extención
               
        if ( !extensioneValidas.includes( extension ) )  {

            return reject(`La extensión ${ extension } no está permitida`);
    
          
        }

    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
  
   archivo.mv(uploadPath, (err) => {
     if (err) {
       reject(err);
     }
  
    resolve( nombreTemp );
   });

    
});

}
module.exports = {

    subirArchivo
}