const { Schema, model } = require('mongoose');

const ReservaSchema = Schema({

  
    identificacion:{

        type: Number,
        required: true
        
    },

    nombre:{

        type: String
        
    },

    celular:{

        type: String
        
    },

    fechaservicio:{

        type: Date
        
    },

    horario:{

        type: String
        
    },

     idevento: {

        type: Schema.Types.ObjectId,
        ref: 'Evento',
        required: true
    },

    estado:{

        type: Boolean,
        default: true
    }

      

});

ReservaSchema.methods.toJSON = function(){

    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Reserva', ReservaSchema );