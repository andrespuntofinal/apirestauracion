const { Schema, model } = require('mongoose');
const format = require('date-fns/format');
const parseISO = require('date-fns/parseISO');

const MiembroSchema = Schema({

    nombre:{

        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    tipo_id:{

        type: String
        
    },

    numero_id:{

        type: String
        
    },

    email:{

        type: String
        
    },

    telefono:{

        type: String
        
    },

    celular:{

        type: String
        
    },

    barrio:{

        type: String
        
    },

    direccion:{

        type: String
        
    },

    sexo:{

        type: String
        
    },

    poblacion:{

        type: String
        
    },

    estado_civil:{

        type: String
        
    },

    fecha_nacimiento:{

        type: String

                  
    },

    imagen:{

        type: String
        
    },

    tipo_miembro:{

        type: String
        
    },

    bautizado:{

        type: String
        
    },

    fecha_membresia:{

        type: String
        
    },

    lider_contacto:{

        type: String
        
    },

    
    ministerio:{

        type: String
    },

    
    estado:{

    type: String
    
    },

    ocupacion:{

        type: String
        
    },

    grupo_celular:{

        type: String
        
    },

    usuario: {

        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }



});

MiembroSchema.methods.toJSON = function(){

    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Miembro', MiembroSchema );