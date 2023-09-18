const { Schema, model } = require('mongoose');

const TipoaporteSchema = Schema({
    tipo_aporte: {

        type: String,
        required: [true, 'El tipo de aporte es obligatorio']
    }

});


module.exports = model('Tipoaporte', TipoaporteSchema );

