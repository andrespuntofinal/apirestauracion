const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    
    nombreevento:{

        type: String,
        required: true
        
    },

    descripcionevento:{

        type: String
        
    },

    asistentesevento:{

        type: Number
       
        
    },

    fechaevento:{

        type: Date
        
    },

    horarioevento:{

        type: String
        
    },

    estadoevento:{

        type: Number
    },

    imagen:{

        type: String
        
    },

    estado:{

        type: Boolean,
        default: true
    }
    

  

});

EventoSchema.methods.toJSON = function(){

    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Evento', EventoSchema );