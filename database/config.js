
var admin = require("firebase-admin");
var serviceAccount = require("../config/serviceAccountKey.json");

  admin.initializeApp({
    
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET_URL
  });


const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

       await mongoose.connect( process.env.MONGODB_CNN )
       

       console.log( `\x1b[33mEstado DB Mongo: \x1b[32m ✔ Activo \x1b[0m`);
        
    } catch (error) {

        console.error(error);

        throw new Error('Error en la DB')
        
    }


}

module.exports = {
    dbConnection,
    admin

}