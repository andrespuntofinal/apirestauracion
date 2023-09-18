const { Schema, model } = require('mongoose');

const AporteSchema = Schema({

    miembro: {

        type: Schema.Types.ObjectId,
        ref: 'Miembro',
        required: true
    },

    tipo_aporte:{

        type: String,
        required: true
        
    },


    fecha_aporte:{

        type: Date,
        required: true
        
    },

    valor_aporte:{

        type: Number,
        required: true
        
    },

    observaciones:{

        type: String
       
        
    },

    usuario: {

        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    fecha_registro:{

        type: Date,
        default: Date.now
        
    },

    estado:{

        type: Boolean,
        default: true
    }

  

});

AporteSchema.methods.toJSON = function(){

    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Aporte', AporteSchema );