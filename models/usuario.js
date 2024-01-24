const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    nombre:{

        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    email:{

        type: String,
        required: [true, 'El correo es obligatorio']
        
    },

    rol:{

        type: String,
        required: true
    },

    uid:{

        type: String,
        required: [true, 'El uid es obligatorio']
    },

    
    password:{

        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    estado:{

        type: String
    },

    imagen:{

        type: String
        
    }



});

module.exports = model('Usuario', UserSchema );