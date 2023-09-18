const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');



class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 3000;

        this.paths = {

            auth: '/api/auth',
            miembros: '/api/miembros',
            aportes: '/api/aportes',
            usuarios: '/api/usuarios',
            buscar: '/api/buscar',
            eventos: '/api/eventos',
            reservas: '/api/reservas',
            uploads: '/api/uploads'

        }
        

        //Conect DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

      //conect DB

      async conectarDB(){
            await dbConnection();
            
      }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        //carga de archivos

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.miembros, require('../routes/miembros'));
        this.app.use( this.paths.aportes, require('../routes/aportes'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.eventos, require('../routes/eventos'));
        this.app.use( this.paths.reservas, require('../routes/reservas'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
